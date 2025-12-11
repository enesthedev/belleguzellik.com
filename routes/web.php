<?php

use App\Actions\Admin\Comments\CreateComment;
use App\Actions\Admin\Comments\DeleteComment;
use App\Actions\Admin\Comments\ShowComments;
use App\Actions\Admin\Services\CreateService;
use App\Actions\Admin\Services\DeleteService;
use App\Actions\Admin\Services\ShowCreateService;
use App\Actions\Admin\Services\ShowServices as AdminShowServices;
use App\Actions\Admin\Services\ShowUpdateService;
use App\Actions\Admin\Services\UpdateService;
use App\Actions\Admin\Services\UploadContentImage;
use App\Actions\Admin\Settings\DeleteProfile;
use App\Actions\Admin\Settings\ShowUpdatePassword;
use App\Actions\Admin\Settings\ShowUpdateProfile;
use App\Actions\Admin\Settings\UpdatePassword;
use App\Actions\Admin\Settings\UpdateProfile;
use App\Actions\Admin\ShowOverview;
use App\Actions\ShowService;
use App\Actions\ShowServices;
use App\Actions\ShowWelcome;
use App\Http\Middleware\HandleAdminInertiaRequests;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;
use Laravel\Fortify\Http\Controllers\PasswordController;
use Laravel\Fortify\RoutePath;

Route::get('/', ShowWelcome::class)->name('home');
Route::get('/services', ShowServices::class)->name('services.index')->translate();
Route::get('/services/{service}', ShowService::class)->name('services.show')->translate();

Route::group([
    'middleware' => ['auth', 'verified', HandleAdminInertiaRequests::class],
    'prefix' => 'admin',
    'as' => 'admin.',
], function () {
    Route::get('/', ShowOverview::class)->name('overview')->translate();

    Route::get('/comments', ShowComments::class)->name('comments.index')->translate();
    Route::post('/comments', CreateComment::class)->name('comments.store')->translate();
    Route::delete('/comments/{comment}', DeleteComment::class)->name('comments.destroy')->translate();

    Route::get('/services', AdminShowServices::class)->name('services.index')->translate();
    Route::get('/services/create', ShowCreateService::class)->name('services.create')->translate();
    Route::post('/services', CreateService::class)->name('services.store')->translate();
    Route::post('/services/upload-content-image', UploadContentImage::class)->name('services.upload-content-image')->translate();
    Route::get('/services/{service}', ShowUpdateService::class)->name('services.edit')->translate();
    Route::put('/services/{service}', UpdateService::class)->name('services.update')->translate();
    Route::delete('/services/{service}', DeleteService::class)->name('services.destroy')->translate();

    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', ShowUpdateProfile::class)->name('profile.edit')->translate();
    Route::patch('settings/profile', UpdateProfile::class)->name('profile.update')->translate();
    Route::delete('settings/profile', DeleteProfile::class)->name('profile.destroy')->translate();

    Route::get('settings/password', ShowUpdatePassword::class)->name('user-password.edit')->translate();

    Route::put('settings/password', UpdatePassword::class)
        ->middleware('throttle:6,1')
        ->name('user-password.update')
        ->translate();
});

Route::group(['middleware' => config('fortify.middleware', ['web'])], function () {

    Route::get(RoutePath::for('login', '/login'), [AuthenticatedSessionController::class, 'create'])
        ->middleware(['guest:'.config('fortify.guard')])
        ->name('login')
        ->translate();

    $limiter = config('fortify.limiters.login');
    $twoFactorLimiter = config('fortify.limiters.two-factor');
    $verificationLimiter = config('fortify.limiters.verification', '6,1');

    Route::post(RoutePath::for('login', '/login'), [AuthenticatedSessionController::class, 'store'])
        ->middleware(array_filter([
            'guest:'.config('fortify.guard'),
            $limiter ? 'throttle:'.$limiter : null,
        ]))
        ->name('login.store')
        ->translate();

    Route::post(RoutePath::for('logout', '/logout'), [AuthenticatedSessionController::class, 'destroy'])
        ->middleware([config('fortify.auth_middleware', 'auth').':'.config('fortify.guard')])
        ->name('logout')
        ->translate();

    Route::put(RoutePath::for('user-password.update', '/user/password'), [PasswordController::class, 'update'])
        ->middleware([config('fortify.auth_middleware', 'auth').':'.config('fortify.guard')])
        ->name('user-password.update')
        ->translate();

});
