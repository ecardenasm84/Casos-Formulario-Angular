import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'registro-usuario',
        loadComponent: () =>
            import('./casos/registro-usuario/registro-usuario')
                .then(m => m.RegistroUsuario)
    },
    {
        path: 'editar-perfil',
        loadComponent: () =>
            import('./casos/editar-perfil/editar-perfil')
                .then(m => m.EditarPerfil)
    },
    {
        path: '',
        redirectTo: 'registro-usuario',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'registro-usuario'
    }
];