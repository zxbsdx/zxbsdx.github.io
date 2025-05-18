<template>
    <div class="content">
        <div class="demo0">
            <div class="photo">
                <img src="../assets/miao~.jpg">
            </div>
            <div class="text">

            </div>
        </div>
    </div>
</template>

<style scoped>
    .content{
        height: 1000px;
        width: 70vw;
        
        gap:20px;
        padding-top: 20px;
        padding-bottom: 20px;
        border-radius: 12px;
  
    }
    .demo0{
        height: 200px;
        margin-bottom: 20px;

        padding-top: 30px;
        border-radius: 12px;
        border: 2px solid black;
        
    }
    img{
        position: relative;
   
        width: 100px;       
        height: 170px;      
        max-width: 100%; 
        max-height: 170px;     
    }
    .photo{
        width: 25vw;
        height: 170px;
        background-color:aqua;
        border-radius: 12px;
        

    }
    .text{
        position: relative;
        height: 180px;
        width: 350px;
        right: 0;
        float: right;

        background-color: aquamarine;
    }
</style>