export interface Novedad {
    id: number;
    id_carrera: number | null;
    titulo: string;
    contenido: string;
    imagen_url?: string | null;
    fecha_publicacion?: string;
    fecha_modificacion?: string;
    estado: 'borrador' | 'publicado' | 'archivado';
    autor?: string;
    destacado: number;
    created_at?: string;
    updated_at?: string;
}
