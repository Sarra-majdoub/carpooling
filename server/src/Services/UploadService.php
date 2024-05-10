<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\String\Slugger\SluggerInterface;

class UploaderService
{
    public function __construct(private SluggerInterface $slugger) {}
    public function uploadFile(UploadedFile $file,string $directoryFolder) {
        $Filename = uniqid().'.'.$file->guessExtension();
        try {
            $file->move(
                $directoryFolder,
                $Filename
            );
        } catch (FileException $e) {
            return null;
        }
        return $Filename;
    }
}