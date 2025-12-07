<?php

use App\Models\User;

test('authenticated users can see sidebar navigation', function () {
    $this->actingAs(User::factory()->create());

    $response = $this->get(route('dashboard'));

    $response->assertOk();
    $response->assertSee('Overview');
    $response->assertSee('Content Management');
});

test('sidebar displays user welcome message', function () {
    $user = User::factory()->create(['name' => 'Test User']);

    $this->actingAs($user);

    $response = $this->get(route('dashboard'));

    $response->assertOk();
    $response->assertSee('Test User');
});

test('sidebar navigation items are translated', function () {
    $this->actingAs(User::factory()->create());

    $response = $this->get(route('dashboard'));

    $response->assertOk();
    $response->assertSee('Comments');
    $response->assertSee('Services');
    $response->assertSee('Posts');
});
