<template lang="pug">
  .uk-container
    div.uk-flex.uk-flex-center
      .uk-card.uk-card-default.uk-card-hover.uk-card-body.uk-width-large
        h3.uk-card-title Привет!
        div
          p Добро пожаловать на {{days(daysInTraining) }}
          p Ваш последний результат - решено {{tasksSolved}} из {{tasksTotal}}
          p Общая точность: {{percent(accuracy)}}%
          h4 Настройки
          form
            .uk-margin-top.uk-margin-top
              .uk-align-left.uk-margin-remove-bottom 1
              .uk-align-right.uk-margin-remove-bottom 15
              input.uk-range(type="range", 
                :value="duration", 
                min="1", 
                max="15", 
                step="1", 
                @input="changeDuration(Number($event.srcElement.value))"
              )
              .uk-flex.uk-flex-center Длительность {{duration}} минут
            .uk-margin-top
              .uk-align-left.uk-margin-remove-bottom 1
              .uk-align-right.uk-margin-remove-bottom 10
              input.uk-range(type="range", 
                :value="skill", 
                min="1", 
                max="10", 
                step="1", 
                @input="changeSkill(Number($event.srcElement.value))"
              )
              .uk-flex.uk-flex-center Сложность {{skill}}
            .uk-margin-top
              div
                label
                  input.uk-checkbox(type="checkbox", :checked="operations.add", @input="changeOperationItem('add', $event.srcElement.checked)")
                  span.uk-margin-left Сложение
              div
                label
                  input.uk-checkbox(type="checkbox", :checked="operations.sub", @input="changeOperationItem('sub', $event.srcElement.checked)")
                  span.uk-margin-left Вычитание
              div
                label
                  input.uk-checkbox(type="checkbox", :checked="operations.mul", @input="changeOperationItem('mul', $event.srcElement.checked)")
                  span.uk-margin-left Умножение
              div
                label
                  input.uk-checkbox(type="checkbox", :checked="operations.div", @input="changeOperationItem('div', $event.srcElement.checked)")
                  span.uk-margin-left Деление
              div
                label
                  input.uk-checkbox(type="checkbox", disabled, :checked="operations.pow", @input="changeOperationItem('pow', $event.srcElement.checked)")
                  span.uk-margin-left Возведение в степень
          .uk-align-right.uk-margin-top.uk-margin-remove-bottom
            router-link.uk-button.uk-button-default(:to="{name: 'game'}") Play!
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Operations } from '@/types';
import {
  State,
  Getter,
  Mutation
} from 'vuex-class';

@Component
export default class Home extends Vue {
  @State operations;
  @Getter daysInTraining;
  @State tasksSolved;
  @Getter tasksTotal;
  @Getter accuracy;
  @State skill;
  @State duration;
  @Mutation changeOperations;
  @Mutation changeDuration;
  @Mutation changeSkill;
  changeOperationItem (name: string, value: boolean) {
    const ops: any = Object.assign({}, this.operations);
    ops[name] = Boolean(value);
    this.changeOperations(ops);
  }

  percent (value: number): string {
    if (Math.floor(value) === value) {
      return String(value);
    } else {
      return value.toFixed(2);
    }
  }

  days (value: number): string {
    if (value) {
      return (value + 1) + ' тренировочный день';
    } else {
      return 'первый тренировочный день';
    }
  }

  private _quantity (value: number, one: string, few: string, many: string): string {
    if (value % 100 < 20 && value % 100 > 10) {
      return String(value) + ' ' + many;
    } else {
      switch (value % 10) {
        case 1:
          return String(value) + ' ' + one;
        case 2:
        case 3:
        case 4:
          return String(value) + ' ' + few;
        default:
          return String(value) + ' ' + many;
      }
    }
  }
}
</script>