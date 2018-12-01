<?php

namespace App\Servicios;

use Psr\Http\Message\UploadedFileInterface;

use App\Modelos\Actividad;
use App\Modelos\Categoria;
use App\Repositorios\ActividadRepo;
use App\Utilidades\UtilidadesGenerales;

class ActividadServicio {
    

    /* Directorio donde se almacenan las actividades */
    protected static $DIR_ACTIVIDADES = 'actividades/';

    protected static $ARCHIVO_INICIO_ACTIVIDAD = 'index.html';

    public function __construct() {
        
    }

    //private function consultarCategorias

    public function getCategorias() {
        return $this->categorias;
    }

    //public function consultarActividades

    /**
     * Inserta la información de la actividad en la BD y almacena sus archivos en disco.
     */
    public function cargarActividad($datos, UploadedFileInterface $archivo) {
        $errores = [];
        $dirCategoria = $this->determinarDirectorioCategoria($datos['categoria']);
        if(empty($dirCategoria)) {
            $errores['categoria'] = 'Por favor selecciona una categoría válida';
        }

        $dirDestino = '';
        $actividadCreada = null;
        if(empty($errores)) {
            $dirDestino = $this->crearDirectorioActividad($datos['categoria'], $dirCategoria);
            if(empty($dirDestino)) {
                $errores['archivo'] = 'Ha ocurrido un error durante el procesamiento del archivo';
            }else{
                $extraccion = $this->extraerActividadEnDirectorio($archivo, $dirDestino);
                if(!empty($extraccion['error'])) {
                    $errores['archivo'] = $extraccion['error'];
                }else{
                    // Si la actividad se descomprimió correctamente, la guardo en la BD
                    $actividadCreada = $this->almacenarActividadEnBD($datos, $dirDestino);
                    if(!empty($actividadCreada['error'])) {
                        $errores['archivo'] = $actividadCreada['error'];
                    }
                }
            }
        }

        $res = [];
        if(!empty($errores)  || empty($actividadCreada)) {
            if(!empty($dirDestino)) {
                $dir = explode(self::$DIR_ACTIVIDADES, $dirDestino);
                if(isset($dir[1]) && !empty($dir[1]) && strlen($dir[1]) > 1) {
                    UtilidadesGenerales::eliminarDirectorio($dirDestino);
                }
            }
            $res['errores'] = $errores;
        }else{
            $res['actividad'] = $actividadCreada;
        }

        return $res;
    }

    /**
     * Determina el directorio según la categoria indicada.
     * Si la categoria es válida retorna el nombre del directorio en minúscula.
     * De lo contrario, retorna un mensaje de error.
     */
    private function determinarDirectorioCategoria($categoriaId) {
        $directorio = '';

        foreach($this->categorias as $categoria) {
            if($categoriaId == $categoria->id) {
                $directorio = strtolower($categoria->nombre);
                break;
            }
        }

        return $directorio;
    }

    /**
     * Crea el directorio que almacenará los archivos de la actividad, según su categoría.
     * Retorna una cadena con la ruta completa del directorio creado. En caso de no crearse, retorna FALSE
     */
    private function crearDirectorioActividad($categoriaId, $directorio) {
        $destinoInicial = UPLOADS_DIR . self::$DIR_ACTIVIDADES;
        // TODO, Crear el método del repo
        $numCarpeta = (int)$this->actividadRepo->contarActividadesPorCategoria($categoriaId);
        $numCarpeta++;

        $destinoFinal = '';
        $creado = false;
        $intentos = 0;
        while(!$creado) {
            $destinoFinal = $destinoInicial . $numCarpeta . '/';
            if(!file_exists($destinoFinal)) {
                if(mkdir($destinoFinal, 0777, true)) {
                    $creado = true;
                }else{
                    if($intentos < 10) {
                        $intentos++;
                    }else{
                        return false;
                    }
                }
            }else{
                $numCarpeta++;
            }
        }

        return $destinoFinal;
    }

    /**
     * Extrae el archivo ZIP de la actividad en el directorio indicado.
     * Retorna TRUE en caso de éxito, de lo contrario un mensaje de error.
     */
    private function extraerActividadEnDirectorio(UploadedFileInterface $archivo, $dirDestino) {
        $res = [];

        $rutaArchivo = $dirDestino . $archivo->getClientFilename();
        $archivo->moveTo($rutaArchivo);

        if(file_exists($dirDestino)) {
            $zip = new \ZipArchive;
            if($zip->open($rutaArchivo) === true) {
                $zip->extractTo($dirDestino);
                $zip->close();
                UtilidadesGenerales::eliminarArchivo($rutaArchivo);
                // Verificamos la existencia del archivo que inicia la actividad
                if(file_exists($dirDestino . self::$ARCHIVO_INICIO_ACTIVIDAD)) {
                    return true;
                }else{
                    $res['error'] = 'La actividad cargada es inválida, asegúrate de que posea el archivo ' . self::$ARCHIVO_INICIO_ACTIVIDAD;
                    UtilidadesGenerales::eliminarDirectorio($dirDestino);
                }
            }else{
                $res['error'] = 'Ha ocurrido un error durante el procesamiento del archivo';
            }
        }else{
            $res['error'] = 'Ha ocurrido un error durante el procesamiento del archivo';
        }

        return $res;
    }

    /**
     * Guarda los datos de la actividad en la BD.
     * En caso de éxito, retorna el ID y la ruta de la nueva actividad. De lo contrario, retorna mensaje de error
     */
    private function almacenarActividadEnBD($datos, $dirDestino) {
        $res = [];

        // Adecuo los campos necesarios antes de instanciar el objeto
        $datos['categoria_id'] = $datos['categoria'];
        $cadena = explode(APP_DIR, $dirDestino);
        $datos['ruta_archivo'] = end($cadena) . self::$ARCHIVO_INICIO_ACTIVIDAD;
        $actividad = new Actividad($datos);

        // TODO, implementar método del repo
        $nuevaActividadId = $this->actividadRepo->crearActividad($actividad);
        if(!empty($nuevaActividadId)) {
            $res = [
                'id' => $nuevaActividadId,
                'rutaArchivo' => $actividad->rutaArchivo
            ];
        }else{
            // TODO, revisar el método
            $this->eliminarActividad($nuevaActividadId);
            $res['error'] = 'Ha ocurrido un error al procesar la información de la nueva actividad en la base de datos';
        }

        return $res;
    }

    /**
     * Elimina una actividad de la BD según su ID.
     * Si el segundo paramétro es TRUE, se eliminan los archivos de la actividad según su ruta.
     */
    //public function eliminarActividad
}