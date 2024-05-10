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
    private ?string $firstname = "";

    #[ORM\Column(length: 255)]
    private ?string $lastname = "";

    #[ORM\Column]
    private ?int $phoneNumber = 0;

    #[ORM\Column(length: 255)]
    private ?string $email = "";

    #[ORM\Column(length: 255)]
    private ?string $password = "";

    #[ORM\Column(length: 255)]
    private ?string $pfpPath = "images/default.PNG";

    #[ORM\Column]
    private ?bool $isAdmin = false;

    #[ORM\Column]
    private ?float $rating = 0;

    #[ORM\Column]
    private ?int $nbRatings = 0;

    #[ORM\ManyToOne(inversedBy: 'Passengers')]
    private ?Ride $joined = null;

    #[ORM\OneToOne(inversedBy: 'driver', cascade: ['persist', 'remove'])]
    private ?Ride $driving = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

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
        return $this->pfpPath;
    }

    public function setPfpPath(string $pfpPath): static
    {
        $this->pfpPath = $pfpPath;

        return $this;
    }

    public function isIsAdmin(): ?bool
    {
        return $this->isAdmin;
    }

    public function getIsAdmin(): ?bool
    {
        return $this->isAdmin;
    }

    public function setIsAdmin(bool $isAdmin): static
    {
        $this->isAdmin = $isAdmin;

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
        return $this->nbRatings;
    }

    public function setNbRatings(int $nbRatings): static
    {
        $this->nbRatings = $nbRatings;

        return $this;
    }

    public function getJoined(): ?Ride
    {
        return $this->joined;
    }

    public function setJoined(?Ride $joined): static
    {
        $this->joined = $joined;

        return $this;
    }

    public function getDriving(): ?Ride
    {
        return $this->driving;
    }

    public function setDriving(?Ride $driving): static
    {
        $this->driving = $driving;

        return $this;
    }
}
