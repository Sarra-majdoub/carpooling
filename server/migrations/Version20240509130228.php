<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240509130228 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE ride (id INT AUTO_INCREMENT NOT NULL, places INT NOT NULL, departure VARCHAR(255) NOT NULL, arrival VARCHAR(255) NOT NULL, departure_time TIME NOT NULL, departure_date DATE NOT NULL, price DOUBLE PRECISION NOT NULL, description VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, joined_id INT DEFAULT NULL, driving_id INT DEFAULT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, phone_number INT NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, pfp_path VARCHAR(255) NOT NULL, is_admin TINYINT(1) NOT NULL, rating DOUBLE PRECISION NOT NULL, nb_ratings INT NOT NULL, INDEX IDX_8D93D64976C94ED4 (joined_id), UNIQUE INDEX UNIQ_8D93D64993C73D88 (driving_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64976C94ED4 FOREIGN KEY (joined_id) REFERENCES ride (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64993C73D88 FOREIGN KEY (driving_id) REFERENCES ride (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64976C94ED4');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64993C73D88');
        $this->addSql('DROP TABLE ride');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
