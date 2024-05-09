<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Ride;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Faker\Factory;
use Doctrine\Persistence\ObjectManager;


class UserFixture extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create();
        for($i = 0; $i < 8; $i++) 
        {
            $user = new User();
            $user->setFirstname($faker->firstName());
            $user->setLastname($faker->lastName());
            $user->setPhoneNumber($faker->phoneNumber());
            $user->setEmail($faker->email());
            $user->setPassword($faker->password());
            $user->setPfpPath('images/'.$i.'.png');
            $user->setIsAdmin(false);
            $user->setRating($faker->randomFloat(1, 1, 5));
            $user->setNbRatings($faker->numberBetween(1, 50));
            $ride = new Ride();
            $ride->setDeparture($faker->city);
            $ride->setArrival($faker->city);
            $ride->setDepartureDate($faker->dateTimeBetween('now', '+1 year'));
            $ride->setPlaces($faker->numberBetween(1, 9));
            $departureTime = \DateTime::createFromFormat('H:i', $faker->time('H:i'));
            $ride->setDepartureTime($departureTime);
            $ride->setDriver($user);
            $user->setDriving($ride);
            $manager->persist($ride);
            $manager->persist($user);
        }

        $manager->flush();
    }
}
