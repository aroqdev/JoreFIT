import { Routes } from '@angular/router';
import { IndexContentComponent } from './index-content/index-content.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfilComponent } from './profil/profil.component';
import { ListPlansComponent } from './list-plans/list-plans.component';
import { ListPlansEjerComponent } from './list-plans-ejer/list-plans-ejer.component';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { PlamAdminComponent } from './plam-admin/plam-admin.component';
import { ProfileAdmComponent } from './profile-adm/profile-adm.component';
import { RecoverPwdComponent } from './recover-pwd/recover-pwd.component';
import { UpdUsrComponent } from './upd-usr/upd-usr.component';
import { AddPlanComponent } from './add-plan/add-plan.component';
import { AddListPlanEjerComponent } from './add-list-plan-ejer/add-list-plan-ejer.component';
import { PagoComponent } from './pago/pago.component';
import { SendComponent } from './send/send.component';
import { UpdatePlanComponent } from './update-plan/update-plan.component';
import { AddCardComponent } from './shopping/add-card/add-card.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { UpdAdminComponent } from './upd-admin/upd-admin.component';
import { EjerAsigComponent } from './ejer-asig/ejer-asig.component';
import { UpdateEjercicioComponent } from './update-ejercicio/update-ejercicio.component';
import { UserAdminUpdateComponent } from './user-admin-update/user-admin-update.component';
import { CambiarEjercicioComponent } from './cambiar-ejercicio/cambiar-ejercicio.component';
import { AddEjerAdminComponent } from './add-ejer-admin/add-ejer-admin.component';
import { PlanAsigAdminComponent } from './plan-asig-admin/plan-asig-admin.component';
import { yesautchGuard } from './guards/yesautch.guard';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'JoreFit - INICIO',
    component: IndexContentComponent // Página principal
  },
  {
    path: 'login',
    title: 'JoreFit - INICIO DE SESION',
    component: LoginComponent,
    canActivate: [yesautchGuard]
  },
  {
    path: 'register',
    title: 'JoreFit - REGISTRO',
    component: RegisterComponent,
    canActivate: [yesautchGuard]
  },
  {
    path: 'registerAdmin',
    title: 'JoreFit - REGISTRO DE ADMINISTRADOR',
    component: AddAdminComponent
  },
  {
    path: 'listPlans',
    title: 'JoreFit - LISTA DE PLANES',
    component: ListPlansComponent // Página principal
  },
  {
    path: 'listPlans/:planId',
    title: 'JoreFit - LISTA DE EJERCICIOS DEL PLAN',
    component: ListPlansEjerComponent // Página con el listado de los planes
  },
  {
    path: 'profile',
    title: 'JoreFit - PERFIL',
    component: ProfilComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile/admin',
    title: 'JoreFit - PERFIL DE ADMINISTRADOR',
    component: ProfileAdmComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'Administrador' }
  },
  {
    path: 'admin/users',
    title: 'JoreFit - GESTION DE USUARIOS',
    component: UserAdminComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'Administrador' }
  },
  {
    path: 'admin/users/:userId',
    title: 'JoreFit - GESTION DE USUARIOS-EDITAR',
    component: UserAdminUpdateComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'Administrador' }
  },
  {
    path: 'admin/planAsig/:userId',
    title: 'JoreFit - GESTION DE PLANES DEL USUARIO',
    component: PlanAsigAdminComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'Administrador' }
  },
  {
    path: 'admin/plans',
    title: 'JoreFit - GESTION DE PLANES',
    component: PlamAdminComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'Administrador' }
  },
  {
    path: 'admin/plans/:planId',
    title: 'JoreFit - GESTION DE PLANES-EDITAR',
    component: UpdatePlanComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'Administrador' }
  },
  {
    path: 'admin/addEjer/:planId',
    title: 'JoreFit - AGREGAR EJERCICIO',
    component: AddEjerAdminComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'Administrador' }
  },
  {
    path: 'admin/ejercicio/:ejerId',
    title: 'JoreFit - GESTION DE EJERCICIO-EDITAR',
    component: UpdateEjercicioComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'Administrador' }
  },
  {
    path: 'login/recover_password',
    title: 'JoreFit - RECUPERAR CONTRASEÑA',
    component: RecoverPwdComponent,
    canActivate: [yesautchGuard]
  },
  {
    path: 'profile/update',
    title: 'JoreFit - ACTUALIZAR DATOS DE CLIENTE',
    component: UpdUsrComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile/updateAdmin',
    title: 'JoreFit - ACTUALIZAR DATOS DE ADMINISTRADOR',
    component: UpdAdminComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile/addPlan',
    title: 'JoreFit - AGREGAR PLAN',
    component: AddPlanComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile/addPlan/:planId',
    title: 'JoreFit - LISTA DE EJERCICIOS DEL PLAN',
    component: AddListPlanEjerComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile/pago/:planId',
    title: 'JoreFit - PAGO DEL PLAN',
    component: PagoComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile/addCard/:planId',
    title: 'JoreFit - AGREGAR TARJETA',
    component: AddCardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile/send',
    title: 'JoreFit - RECIBO',
    component: SendComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile/:planId',
    title: 'JoreFit - EJERCICIOS ASIGNADOS',
    component: EjerAsigComponent,
    canActivate: [authGuard]
  },
  {
    path: 'cambiar/:planId',
    title: 'JoreFit - CAMBIAR EJERCICIO ASIGNADO',
    component: CambiarEjercicioComponent,
    canActivate: [authGuard]
  }
];
