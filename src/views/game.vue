<template lang="pug">
  .uk-container
    div.uk-flex.uk-flex-center
      .uk-card.uk-card-default.uk-card-hover.uk-card-body.uk-width-large
        router-link.uk-button.uk-button-default(:to="{ name: 'home' }") 
              span(uk-icon="icon: close")
              span.uk-margin-left Отмена
        .uk-align-right.uk-margin-remove-bottom
          input.uk-input.uk-form-width-small(type="text", readonly, :value="timeLeft")
        .uk-container.uk-margin-top 
            .uk-flex.uk-flex-between.uk-flex-middle.uk-flex-row
              input.uk-input.uk-form-width-xsmall(v-model.number="operands.first")
              label.uk-margin-left.uk-margin-right {{operatorSign}}
              input.uk-input.uk-form-width-xsmall(v-model.number="operands.second")
              label.uk-margin-left.uk-margin-right {{operatorSign}}
              input.uk-input.uk-form-width-xsmall(v-model.number="operands.third")
            .uk-margin-top 
              span ={{expectedResult}}
        .uk-flex.uk-flex-between.uk-flex-middle.uk-flex-row.uk-margin-medium-top 
          button.uk-icon-button.uk-button-danger 1
          button.uk-icon-button.uk-button-danger 2
          button.uk-icon-button.uk-button-danger 3
          button.uk-icon-button.uk-button-primary &lt;
        .uk-flex.uk-flex-between.uk-flex-middle.uk-flex-row.uk-margin-medium-top 
          button.uk-icon-button.uk-button-danger 4
          button.uk-icon-button.uk-button-danger 5
          button.uk-icon-button.uk-button-danger 6
          button.uk-icon-button.uk-button-primary &gt;
        .uk-flex.uk-flex-between.uk-flex-middle.uk-flex-row.uk-margin-medium-top 
          button.uk-icon-button.uk-button-danger 7
          button.uk-icon-button.uk-button-danger 8
          button.uk-icon-button.uk-button-danger 9
          button.uk-icon-button.uk-button-primary ?
        .uk-flex.uk-flex-between.uk-flex-middle.uk-flex-row.uk-margin-medium-top 
          button.uk-icon-button.uk-button-danger.invisible
          button.uk-icon-button.uk-button-danger 0
          button.uk-icon-button.uk-button-danger.invisible
          button.uk-icon-button.uk-button-primary =

</template>
<style>
  .invisible {
    opacity: 0
  }
</style>
<script lang="ts">
import dayjs from 'dayjs';
import _padStart from 'lodash.padstart';
import { Component, Vue } from 'vue-property-decorator';
import {
  State,
  Getter,
  Mutation
} from 'vuex-class';

@Component
export default class Game extends Vue {
  @State operations;
  @Getter daysInTraining;
  @State tasksSolved;
  @State tasksTotal;
  @Getter accuracy;
  @State skill;
  @State duration;
  @Mutation addTaskSolved;
  @Mutation addTaskFailed;
  timerStarted: any;
  secondsElapsed: number;
  secondsRemained: number;
  interval: any;
  timeLeft = '';
  operatorSign = '*';
  operands = {
    first: 0,
    second: 0,
    third: 0
  };
  expectedResult = 0;
  beforeMount () {
    this.secondsElapsed = 0;
    this.secondsRemained = 0;
    this.timerStarted = dayjs();
    this.tick();
    this.interval = setInterval(() => this.tick(), 100);
  }
  mounted () {
    const candidates = [];
    if (this.operations.add) {
      candidates.push('+');
    }
    if (this.operations.sub) {
      candidates.push('-');
    }
    if (this.operations.mul) {
      candidates.push('*');
    }
    if (this.operations.div) {
      candidates.push('/');
    }
    if (this.operations.pow) {
      candidates.push('^');
    }
    this.operatorSign = candidates[Math.floor(Math.random() * candidates.length)];
    switch (this.operatorSign) {
      case '+':
      case '-':
      case '*':
        // From operands to result
        this.operands.first = Math.floor(Math.random() * this.skill);
        this.operands.second = Math.floor(Math.random() * this.skill);
        this.operands.third = Math.floor(Math.random() * this.skill);
        /* tslint:disable-next-line */
        this.expectedResult = eval(`${this.operands.first}${this.operatorSign}${this.operands.second}${this.operatorSign}${this.operands.third}`);
        break;
      case '/':
        // Reverse order - from result to operands
        this.expectedResult = Math.floor(Math.random() * this.skill * 2);
        this.operands.second = Math.floor(Math.random() * this.skill);
        this.operands.third = Math.floor(Math.random() * this.skill);
        this.operands.first = this.expectedResult * this.operands.third * this.operands.second;
        break;
    }
  }
  beforeDestroy () {
    this.stopTimer();
  }
  tick () {
    const seconds = dayjs().diff(this.timerStarted, 'second');
    const secondsRemained = this.duration * 60 - seconds;
    if (secondsRemained <= 0) {
      return this.loseGame();
    }
    const timeRemained = _padStart(Math.floor(this.secondsRemained / 60), 2, '0') + ':' +
      _padStart(Math.floor(this.secondsRemained % 60), 2, '0');
    Vue.set(this, 'secondsElapsed', seconds);
    Vue.set(this, 'secondsRemained', secondsRemained);
    Vue.set(this, 'timeLeft', timeRemained);
  }
  stopTimer () {
    clearInterval(this.interval);
  }
  loseGame () {
    this.stopTimer();
    this.addTaskFailed();
    alert('U lost');
  }
  winGame () {
    this.stopTimer();
    this.addTaskSolved();
    alert('U win');
  }

}

</script>