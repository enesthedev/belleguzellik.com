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
use App\Actions\Admin\Settings\ShowUpdateProfile;
use App\Actions\Admin\Settings\UpdatePassword;
use App\Actions\Admin\Settings\UpdateProfile;
use App\Actions\Admin\ShowOverview;
use App\Actions\ShowService;
use App\Actions\ShowServices;
use App\Actions\ShowWelcome;
use App\Http\Middleware\HandleAdminInertiaRequests;
use Illuminate\Support\Facades\Route;

Route::get('/', ShowWelcome::class)->name('home');
Route::get('/services', ShowServices::class)->name('services.index');
Route::get('/services/{service}', ShowService::class)->name('services.show');

Route::middleware(['auth', 'verified', HandleAdminInertiaRequests::class])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/', ShowOverview::class)->name('overview');

        Route::get('/comments', ShowComments::class)->name('comments.index');
        Route::post('/comments', CreateComment::class)->name('comments.store');
        Route::delete('/comments/{comment}', DeleteComment::class)->name('comments.destroy');

        Route::get('/services', AdminShowServices::class)->name('services.index');
        Route::get('/services/create', ShowCreateService::class)->name('services.create');
        Route::post('/services', CreateService::class)->name('services.store');
        Route::post('/services/upload-content-image', UploadContentImage::class)->name('services.upload-content-image');
        Route::get('/services/{service}', ShowUpdateService::class)->name('services.edit');
        Route::put('/services/{service}', UpdateService::class)->name('services.update');
        Route::delete('/services/{service}', DeleteService::class)->name('services.destroy');

        Route::redirect('settings', '/settings/profile');

        Route::get('settings/profile', ShowUpdateProfile::class)->name('profile.edit');
        Route::patch('settings/profile', UpdateProfile::class)->name('profile.update');
        Route::delete('settings/profile', DeleteProfile::class)->name('profile.destroy');

        Route::get('settings/password', ShowUpdateProfile::class)->name('user-password.edit');

        Route::put('settings/password', UpdatePassword::class)
            ->middleware('throttle:6,1')
            ->name('user-password.update');
    });
