import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { JWTService } from './services/jwt.service';

@NgModule({
    declarations: [],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
    exports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
    providers: [AuthService, JWTService],
})
export class SharedModule {}
