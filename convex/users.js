import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser=mutation({
    args:{
        name:v.string(),
        email:v.string(),
        picture:v.string(),
        uid:v.string()
    },
    handler:async(ctx, args)=>{
        const user=await ctx.db.query('users').filter((q) => q.eq(q.field('email'),args.email)).collect()
        console.log(user)
        if(user?.length ==0){
            const result = await ctx.db.insert('users',{
                name:args.name,
                picture:args.picture,
                email:args.email,
                uid:args.uid
            })
            console.log(result)
        }
    }
})

export const GetUser = query({
    args:{
        email:v.string()
    },
    handler:async(ctx,args)=> {
        const user = await ctx.db.query('users').filter((q) => q.eq(q.field('email'),args.email)).collect()
        return user[0]
    }
})