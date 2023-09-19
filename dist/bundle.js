(()=>{var s={390:(s,e,t)=>{const a=t(977);s.exports={createTask:async(s,e)=>{const{name:t,description:o,taskDone:r}=s.body,n=s.user.id;if(!t)return void e.status(422).json({error:"o nome é obrigatorio!"});if(!o)return void e.status(422).json({error:"a descrição é obrigatoria!"});if(!r)return void e.status(422).json({error:"o check da task é obrigatorio!"});const i={name:t,description:o,taskDone:r,createdBy:n};try{await a.create(i),e.status(201).json({message:"Task inserida com sucesso"})}catch(s){e.status(500).json({error:s})}},getTasks:async(s,e)=>{const t=s.user.id;try{const s=await a.find({createdBy:t});e.status(200).json(s)}catch(s){e.status(500).json({error:s})}},getTaskById:async(s,e)=>{const t=s.params.id,o=s.user.id;try{const s=await a.findOne({_id:t,createdBy:o});if(!s)return e.status(422).json({message:"Essa task não foi encontrada"});e.status(200).json(s)}catch(s){e.status(500).json({error:s})}},updateTask:async(s,e)=>{const t=s.params.id,o=s.user.id;if(!/^[0-9a-fA-F]{24}$/.test(t))return e.status(422).json({message:"ID da task invalida"});const{name:r,description:n,taskDone:i}=s.body,c={name:r,description:n,taskDone:i};try{if(0===(await a.updateOne({_id:t,createdBy:o},c)).matchedCount)return void e.status(422).json({message:"A task não foi encontrado"});e.status(201).json({message:"Task alterada com sucesso"})}catch(s){e.status(500).json({error:s})}},deleteTask:async(s,e)=>{const t=s.params.id,o=s.user.id;if(!/^[0-9a-fA-F]{24}$/.test(t))return e.status(422).json({message:"ID da task invalida"});try{return await a.findOne({_id:t,createdBy:o})?(await a.deleteOne({_id:t}),e.status(200).json({message:"Task removida com sucesso"})):e.status(422).json({message:"Essa task não foi encontrada"})}catch(s){return console.error("Erro ao excluir a tarefa:",s),e.status(500).json({error:"Ocorreu um erro interno no servidor"})}}}},456:(s,e,t)=>{const a=t(96),o=t(344),r=t(348);t(142).config(),s.exports={getUserById:async(s,e)=>{const t=s.params.id;if(!/^[0-9a-fA-F]{24}$/.test(t))return e.status(422).json({message:"ID do usuário inválido"});try{const s=await r.findById(t,"-password");if(!s)return e.status(404).json({message:"Usuário não encontrado"});e.status(200).json({user:s})}catch(s){e.status(500).json({error:s})}},registerUser:async(s,e)=>{const{name:t,email:o,password:n}=s.body;if(!t)return e.status(422).json({message:"Nome é obrigatório"});if(!o)return e.status(422).json({message:"Email é obrigatório"});if(!n)return e.status(422).json({message:"Senha é obrigatória"});if(await r.findOne({email:o}))return e.status(422).json({message:"Email já utilizado"});const i=await a.genSalt(12),c=await a.hash(n,i),u=new r({name:t,email:o,password:c});try{await u.save(),e.status(201).json({message:"Usuário criado com sucesso"})}catch(s){e.status(500).json({error:s})}},loginUser:async(s,e)=>{const{email:t,password:n}=s.body;if(!t)return e.status(422).json({message:"Email é obrigatório"});if(!n)return e.status(422).json({message:"Senha é obrigatória"});const i=await r.findOne({email:t});if(!i)return e.status(422).json({message:"Usuário não encontrado"});if(!await a.compare(n,i.password))return e.status(422).json({message:"Senha inválida"});try{const s=process.env.SECRET,t=o.sign({id:i._id},s);e.status(200).json({message:"Autenticação realizada com sucesso",token:t})}catch(s){e.status(500).json({error:s})}}}},971:(s,e,t)=>{const a=t(344);t(142).config(),s.exports=function(s,e,t){const o=s.headers.authorization,r=o&&o.split(" ")[1];if(!r)return e.status(401).json({message:"Acesso negado"});try{const e=process.env.SECRET,o=a.verify(r,e);s.user=o,t()}catch(s){e.status(400).json({message:"Token inválido"})}}},977:(s,e,t)=>{const a=t(185),o=a.model("Task",{name:{type:String,required:[!0,"O campo name é obrigatorio"]},description:{type:String,required:[!0,"O campo description é obrigatorio"]},taskDone:{type:Boolean,required:[!0,"O campo taskDone é obrigatorio"]},createdBy:{type:a.Schema.Types.ObjectId,ref:"User"},createdDate:{type:Date,default:Date.now}});s.exports=o},348:(s,e,t)=>{const a=t(185).model("User",{name:{type:String,required:[!0,"O campo name é obrigatorio"]},email:{type:String,required:[!0,"O campo email é obrigatorio"]},password:{type:String,required:[!0,"O campo password é obrigatorio"]},createdDate:{type:Date,default:Date.now}});s.exports=a},452:(s,e,t)=>{const a=t(860).Router(),o=t(390),r=t(971);a.use(r),a.post("/",o.createTask),a.get("/",o.getTasks),a.get("/:id",o.getTaskById),a.patch("/:id",o.updateTask),a.delete("/:id",o.deleteTask),s.exports=a},494:(s,e,t)=>{const a=t(860).Router(),o=t(456),r=t(971);a.get("/:id",r,o.getUserById),a.post("/auth/register",o.registerUser),a.post("/auth/login",o.loginUser),s.exports=a},96:s=>{"use strict";s.exports=require("bcrypt")},142:s=>{"use strict";s.exports=require("dotenv")},860:s=>{"use strict";s.exports=require("express")},344:s=>{"use strict";s.exports=require("jsonwebtoken")},185:s=>{"use strict";s.exports=require("mongoose")}},e={};function t(a){var o=e[a];if(void 0!==o)return o.exports;var r=e[a]={exports:{}};return s[a](r,r.exports,t),r.exports}(()=>{const s=t(860),e=t(185),a=s();t(142).config(),a.use(s.urlencoded({extended:!0})),a.use(s.json());const o=t(452);a.use("/task",o);const r=t(494);a.use("/user",r);const n=process.env.DB_USER,i=process.env.DB_PASSWORD;e.connect(`mongodb+srv://${n}:${i}@cluster0.cvmub6j.mongodb.net/?retryWrites=true&w=majority`).then((()=>{console.log("Conectados ao mongoDB"),a.listen(3e3)})).catch((s=>console.log(s)))})()})();