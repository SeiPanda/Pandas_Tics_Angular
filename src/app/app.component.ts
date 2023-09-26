import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {Field} from "./core/model/field.model";
import {FieldData} from "./core/model/field-data.model";
import {Player} from "./core/model/player.model";
import {PlayerData} from "./core/model/player-data.dummy";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  username!: string;

  players: Player[] = PlayerData;
  text: string = "";
  fields: Field[] = FieldData;
  currentPlayer!: Player;
  clickedFields: Field[] = [];
  isGameReady = false;
  isPlayerNameSubmited = false;


  ngOnInit(){
      const d = this.players.find(x => x.currentTurn);
      if(d !== undefined){
        this.currentPlayer = d;
      }
  }

  send() {
    const username = this.username;
  }

   onField(field: Field){
      if(field.clicked){
        return
      }else {
        field.clicked = true;
        field.sign = this.currentPlayer.sign;

        this.checkTriple();
      }
   }

   setPlayers(){
     this.players.forEach(player =>  {
       player.currentTurn = !player.currentTurn
       if(player.currentTurn){
         this.currentPlayer = player;
       }
     })
   }

   checkTriple(){
     this.clickedFields = this.fields.filter(field => field.clicked);
     let fieldValues: number[] = [];

     console.log(this.clickedFields);
     let isWinner = false;
     let winningBoxes: number[] = [];
     if(this.clickedFields.length >= 3){
       this.fields.forEach(x => {
         let sign = null;
         if(x.sign === this.players[0].sign){
           sign = 0;
         }

         if(x.sign === this.players[1].sign){
           sign = 1;
         }

         fieldValues.push(sign!);
       })


       if( fieldValues[0] != null && fieldValues[0] == fieldValues[1] && fieldValues[1] == fieldValues[2] ) {
         isWinner = true;
         winningBoxes = [0, 1, 2];
       }

       if( fieldValues[0] != null && fieldValues[0] == fieldValues[3] && fieldValues[3] == fieldValues[6] ) {
         isWinner = true;
         winningBoxes = [0, 3, 6];
       }

       if( fieldValues[0] != null && fieldValues[0] == fieldValues[4] && fieldValues[4] == fieldValues[8] ) {
         isWinner = true;
         winningBoxes = [0, 4, 8];
       }

       if( fieldValues[1] != null && fieldValues[1] == fieldValues[4] && fieldValues[4] == fieldValues[7] ) {
         isWinner = true;
         winningBoxes = [1, 4, 7];
       }

       if( fieldValues[2] != null && fieldValues[2] == fieldValues[4] && fieldValues[4] == fieldValues[6] ) {
         isWinner = true;
         winningBoxes = [4, 6, 2];
       }

       if( fieldValues[3] != null && fieldValues[3] == fieldValues[4] && fieldValues[4] == fieldValues[5] ) {
         isWinner = true;
         winningBoxes = [3, 4, 5];
       }
       if( fieldValues[2] != null && fieldValues[2] == fieldValues[5] && fieldValues[5] == fieldValues[8] ) {
         isWinner = true;
         winningBoxes = [8, 5, 2];
       }
       if( fieldValues[6] != null && fieldValues[6] == fieldValues[7] && fieldValues[7] == fieldValues[8] ) {
         isWinner = true;
         winningBoxes = [6, 7, 8];
       }

     }

     if(isWinner){
       this.fields.forEach(x => {
         x.clicked = true;
       })
       this.showWinner(winningBoxes);
     }else {
       this.setPlayers();
     }
   }
   showWinner(winningBoxes: number[]){

    winningBoxes.forEach( box => {
      winningBoxes.forEach(x => {
        this.fields[x].win = true;
      })
    });

    this.currentPlayer.wins++;

    setTimeout( () => {
      this.fields.forEach(field => {
        field.sign = '';
        field.clicked  = false;
      })

      this.setPlayers();


      winningBoxes.forEach(x => {
        this.fields[x].win = false;
      })
    }, 1000);
  }

}
