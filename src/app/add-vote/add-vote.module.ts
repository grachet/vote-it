import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddVotePageRoutingModule } from './add-vote-routing.module';

import { AddVotePage } from './add-vote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddVotePageRoutingModule
  ],
  declarations: [AddVotePage]
})
export class AddVotePageModule { }
