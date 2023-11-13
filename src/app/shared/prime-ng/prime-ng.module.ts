import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { FileUploadModule } from 'primeng/fileupload';
@NgModule({
  declarations: [],
  exports: [
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    DropdownModule,
    ToastModule,
    SidebarModule,
    MenuModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    InputNumberModule,
    ConfirmPopupModule,
    FileUploadModule
  ]
})
export class PrimeNGModule { }
