<template>
<h1>Grid Elements</h1>

<p>A Grid Layout must have a parent element with the <em>display</em> property set to <em>grid</em> or <em>inline-grid</em>.</p>

<p>Direct child element(s) of the grid container automatically becomes grid items.</p>
<div id="wrapper">
    <div class="grid-container">
    <div class="grid-item">1</div>
    <div class="grid-item">3</div>  
    <div class="grid-item">4</div>
    <div class="grid-item">5</div>
    <div class="grid-item">6</div>  
    <div class="grid-item">7</div>
    <div class="grid-item">8</div>
    <div class="grid-item">9</div>  
    </div>
</div>
</template>

<style scoped>


.grid-container {
  display: grid;
  column-gap: 50px;
  grid-template-columns: auto auto;
  background-color: #2196F3;
  padding: 10px;
  width: 500px;
  justify-content: center;
  border: 3px solid rgba(0, 0, 0, 0.8);
  
}
.grid-item {
    width: 50px;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.8);
    padding: 20px;
    font-size: 30px;
    text-align: center;
}
.grid-item:first-child{
    text-align: center;
    width: 100px;
    grid-column: 1 / 3; /* span from grid column line 1 to 3 (i.e., span 2 columns) */
}
#wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>