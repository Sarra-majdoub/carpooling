<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $firstName = null;

    #[ORM\Column(length: 255)]
    private ?string $lastName = null;

    #[ORM\Column]
    private ?int $phoneNumber = null;

    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    private ?string $pfp_path = null;

    #[ORM\Column]
    private ?bool $is_admin = null;

    #[ORM\Column]
    private ?float $rating = null;

    #[ORM\Column]
    private ?int $nb_ratings = null;

    #[ORM\ManyToOne(cascade: ['persist', 'remove'])]
    private ?Ride $joined_id = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?Ride $driving_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): static
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): static
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getPhoneNumber(): ?int
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(int $phoneNumber): static
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getPfpPath(): ?string
    {
        return $this->pfp_path;
    }

    public function setPfpPath(string $pfp_path): static
    {
        $this->pfp_path = $pfp_path;

        return $this;
    }

    public function isIsAdmin(): ?bool
    {
        return $this->is_admin;
    }

    public function setIsAdmin(bool $is_admin): static
    {
        $this->is_admin = $is_admin;

        return $this;
    }

    public function getRating(): ?float
    {
        return $this->rating;
    }

    public function setRating(float $rating): static
    {
        $this->rating = $rating;

        return $this;
    }

    public function getNbRatings(): ?int
    {
        return $this->nb_ratings;
    }

    public function setNbRatings(int $nb_ratings): static
    {
        $this->nb_ratings = $nb_ratings;

        return $this;
    }

    public function getJoinedId(): ?Ride
    {
        return $this->joined_id;
    }

    public function setJoinedId(?Ride $joined_id): static
    {
        $this->joined_id = $joined_id;

        return $this;
    }

    public function getDrivingId(): ?Ride
    {
        return $this->driving_id;
    }

    public function setDrivingId(?Ride $driving_id): static
    {
        $this->driving_id = $driving_id;

        return $this;
    }
}
