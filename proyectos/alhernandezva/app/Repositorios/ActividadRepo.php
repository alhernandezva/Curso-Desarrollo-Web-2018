<?php

namespace App\Repositorios;

use PDO;
use App\Modelos\Actividad;

class ActividadRepo extends RepositorioAbstracto {

    //public function consultarCategorias

    public function consultarActividadPorId($actividadId) {
        $sql = 'SELECT * FROM actividad WHERE id = :id';
        
        $query = $this->db->prepare($sql);
        $query->bindValue(':id', (int)$actividadId, PDO::PARAM_INT);
        $query->execute();

        return $query->fetch();
    }

    //public function consultarActividades

    //public function contarActividadesPorCategoria

    //public function crearActividad

    //public function eliminarActivida

}