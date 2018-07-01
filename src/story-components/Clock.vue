<template>
  <span class="clock-time" v-bind:class="ampm" ><span>{{ hours }}</span><i>:</i><span>{{ minutes }}</span></span>
</template>

<script>

function zeroFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}

export default {
  props: [
    'timestamp'
  ],
  computed: {
    hours() {
      const dateTime = new Date(this.timestamp);
      return ((dateTime.getHours() - 1) % 12);
    },
    minutes() {
      const dateTime = new Date(this.timestamp);
      return zeroFill(dateTime.getMinutes(), 2);
    },
    ampm() {
      const dateTime = new Date(this.timestamp);
      return dateTime.getHours() >= 13 ? "pm" : "am";
    }
  }
}
</script>

<style>

.clock-time {
  font-family: mono;
  background: #270003;
  padding: 4px 7px 4px 12px;
  margin: 0 10px 0 5px;
  color: #f00;
  position: relative;
  border-radius: 4px;
  box-shadow: 1px -1px 0 0px #79797b, -1px 1px 0 0px #101010, -1px -1px 0 0px #101010, 1px 1px 0 0px #101010, inset 0 0 0 1px #000, inset 0 0 0 5px #121315;
}

.clock-time.pm:after {
  content: '.';
  line-height: 0;
  position: absolute;
  display: block;
  left: 3px;
  top: 3px;
}

@keyframes blink {
    0%   {color: #f00;}
    49%   {color: #f00;}
    50%   {color: #000;}
    99%   {color: #000;}
}

.clock-time i {
  font-style: normal;
}

.clock-time i {
  font-style: normal;
  animation: 1s linear 0s infinite blink;
}

</style>
