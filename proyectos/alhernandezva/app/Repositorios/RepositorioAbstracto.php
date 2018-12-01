<?php

namespace App\Repositorios;

use PDO;

abstract class RepositorioAbstracto {
    protected $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }
}