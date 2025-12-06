<?php

use App\Actions\Settings\DeleteProfile;
use App\Actions\Settings\ShowAppearancePage;
use App\Actions\Settings\ShowPasswordPage;
use App\Actions\Settings\ShowProfilePage;
use App\Actions\Settings\UpdatePassword;
use App\Actions\Settings\UpdateProfile;
use App\Actions\ShowDashboardPage;
use App\Actions\ShowWelcomePage;
use Illuminate\Support\Facades\Route;

Route::get('/', ShowWelcomePage::class)->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', ShowDashboardPage::class)->name('dashboard');
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

    Route::get('settings/appearance', ShowAppearancePage::class)->name('appearance.edit');
});
