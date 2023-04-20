<?php

namespace Tests\Feature;

use App\Models\Event;
use Tests\TestCase;

class CreateEventTest extends TestCase
{
    public function test_create_event_without_date(): void
    {
        $this->post(route('events.store'), Event::factory([
            'start_at' => null,
            'end_at' => null
        ])->raw())->assertStatus(302)->assertSessionHasErrors(['start_at', 'end_at']);

        $this->assertDatabaseEmpty('events');
    }

    public function test_create_event_with_name_too_long(): void
    {
        $this->post(route('events.store'), Event::factory([
            'name' => 'Test Event Name Tooooooooooooooo Long'
        ])->raw())->assertStatus(302)->assertSessionHasErrors(['name']);

        $this->assertDatabaseEmpty('events');
    }


    public function test_create_event_with_all_values(): void
    {
        $this->post(route('events.store'), $event = Event::factory()->raw())->assertStatus(201);

        $this->assertDatabaseCount('events', 1);

        $this->assertDatabaseHas('events', [
            'name' => $event['name'],
            'description' => $event['description'],
            'start_at' => $event['start_at'],
            'end_at' => $event['end_at']
        ]);
    }
}
