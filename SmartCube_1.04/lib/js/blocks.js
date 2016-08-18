/**
 * BLOCKS对象，block的对象包，从support对象中分离
 */
BLOCKS = {
    air:{
        type:"soft"
    },
    dirt:{
        type:"hard",
        suv:"same",
        face:function (){return anl.getMaps("blocks/dirt")},
        color:0x634822
    },
    grass:{
        type:"hard",
        suv:"half",
        upFace:function (){return anl.getMaps("blocks/grass_py")},
        downFace:function (){return anl.getMaps("blocks/dirt")},
        sideFace:function (){return anl.getMaps("blocks/grass_sd")},
        color:0x6FA221
    }
};