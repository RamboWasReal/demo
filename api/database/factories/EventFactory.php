<?php

namespace Database\Factories;

use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    protected $model = Event::class;

    public function definition(): array
    {
        $start_at = Carbon::parse(fake()->dateTime);
        $end_at = Carbon::parse($start_at)->addHour();
        return [
            'name' => fake()->name,
            'description' => fake()->text,
            'start_at' => $start_at,
            'end_at' => $end_at
        ];
    }
}
