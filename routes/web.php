<?php

use App\Actions\Admin\Comments\CreateComment;
use App\Actions\Admin\Comments\DeleteComment;
use App\Actions\Admin\Comments\GetCommentsCount;
use App\Actions\Admin\Comments\ShowCommentsPage;
use App\Actions\Admin\GetSidebarCounts;
use App\Actions\Admin\Services\CreateService;
use App\Actions\Admin\Services\DeleteService;
use App\Actions\Admin\Services\GetServicesCount;
use App\Actions\Admin\Services\ShowCreateServicePage;
use App\Actions\Admin\Services\ShowEditServicePage;
use App\Actions\Admin\Services\ShowServicesPage as AdminShowServicesPage;
use App\Actions\Admin\Services\UpdateService;
use App\Actions\Admin\Services\UploadContentImage;
use App\Actions\Admin\Settings\DeleteProfile;
use App\Actions\Admin\Settings\ShowPasswordPage;
use App\Actions\Admin\Settings\ShowProfilePage;
use App\Actions\Admin\Settings\UpdatePassword;
use App\Actions\Admin\Settings\UpdateProfile;
use App\Actions\Admin\ShowOverviewPage;
use App\Actions\Services\ShowServiceDetailPage;
use App\Actions\Services\ShowServicesPage;
use App\Actions\ShowWelcomePage;
use Illuminate\Support\Facades\Route;

Route::get('/', ShowWelcomePage::class)->name('home');
Route::get('/services', ShowServicesPage::class)->name('services.index');
Route::get('/services/{service}', ShowServiceDetailPage::class)->name('services.show');

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', ShowOverviewPage::class)->name('overview');
    Route::get('/sidebar/counts', GetSidebarCounts::class)->name('sidebar.counts');

    Route::get('/comments', ShowCommentsPage::class)->name('comments.index');
    Route::get('/comments/count', GetCommentsCount::class)->name('comments.count');
    Route::post('/comments', CreateComment::class)->name('comments.store');
    Route::delete('/comments/{comment}', DeleteComment::class)->name('comments.destroy');

    Route::get('/services', AdminShowServicesPage::class)->name('services.index');
    Route::get('/services/count', GetServicesCount::class)->name('services.count');
    Route::get('/services/create', ShowCreateServicePage::class)->name('services.create');
    Route::post('/services', CreateService::class)->name('services.store');
    Route::post('/services/upload-content-image', UploadContentImage::class)->name('services.upload-content-image');
    Route::get('/services/{service}/edit', ShowEditServicePage::class)->name('services.edit');
    Route::put('/services/{service}', UpdateService::class)->name('services.update');
    Route::delete('/services/{service}', DeleteService::class)->name('services.destroy');
});

Route::middleware('auth')->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', ShowProfilePage::class)->name('profile.edit');
    Route::patch('settings/profile', UpdateProfile::class)->name('profile.update');
    Route::delete('settings/profile', DeleteProfile::class)->name('profile.destroy');

    Route::get('settings/password', ShowPasswordPage::class)->name('user-password.edit');

    Route::put('settings/password', UpdatePassword::class)
        ->middleware('throttle:6,1')
        ->name('user-password.update');
});
