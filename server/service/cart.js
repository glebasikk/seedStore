
const cart = require("../repository/cart");
const seed = require("../repository/seed");
const user = require("../repository/user")
const NotFound = require("../errors/NotFound");
const Forbidden = require("../errors/Forbidden");

class Cart {
    async Mail (body){
        let paymentMethod = body.paymentMethod
        let deliveryMethod = body.deliveryMethod
        let phone = body.phone
        let seedId = body.seedId
        let username = body.username
        let amount = body.amount
        let totalPrice = 0
        let result = []
        let str = ``
        if (seedId.length != amount.length){
            throw new Forbidden("Incorrect input values");
        }
        // for (let i = 0; i<seedId.length; i++){
        //     let data = await seed.seedById(seedId[i])
        //     if (data == null) {
        //         throw new NotFound("Seed  does not exist");
        //     }
        //     result[i]={
        //         "Название": data.dataValues.name,
        //         "Колличество": amount[i],
        //         "Цена за единицу товара": data.dataValues.price,
        //         "Цена товара с учетом колличества": data.dataValues.price*amount[i]
                
        //     }
        //     totalPrice += amount[i]*data.dataValues.price 
        // }
        // result.push({"Общая сумма заказа": totalPrice,"имя пользователя": username, "Номер телефона": phone, "Способ доставки": deliveryMethod, "Способ оплаты": paymentMethod})
        // return "222"
        for (let i = 0; i<seedId.length; i++){
            let data = await seed.seedById(seedId[i])
            if (data == null) {
                throw new NotFound("Seed  does not exist");
            }
            str +=`"Название": ${data.dataValues.name},
                   "Колличество": ${amount[i]},
                   "Цена за единицу товара": ${data.dataValues.price},
                   "Цена товара с учетом колличества": ${data.dataValues.price*amount[i]} \n\n`

                
  
            totalPrice += amount[i]*data.dataValues.price 
        }
        str +=`Общая сумма заказа: ${totalPrice} \n, Имя пользователя: ${username}\n, Номер телефона: ${phone}\n, Способ доставки: ${deliveryMethod}\n, Способ оплаты: ${paymentMethod}`
        return str
    }


    async allBaskets() {
        return await cart.allBaskets();
    }
    async userCart(body) {
        let userId = body.userId
        return await cart.userCart(userId);
    }
    async deleteCart(body) {
        let id = body.id
        return await cart.deleteCart(id);
    }
    async addCart(body) {
        let seedId = body.seedId
        let userId = body.userId
        let amount = body.amount
        
        let price = await seed.seedById(seedId)
        if (price == null) {
            throw new NotFound("Seed  does not exist");
        }
        price = price.dataValues.price
        
        let tmp = await user.findUserById(userId)
        if (tmp == null) {
            throw new NotFound("User does not exist");
        }   
        tmp = await cart.findCartByUserIdAndSeedId(userId,seedId)
        if (tmp != null) {
            throw new NotFound("The current user already has this item in their cart");
        }   
        price = price * amount;
        return await cart.addCart(
            seedId,
            userId,
            price,
            amount
        );
    }
    async updateCart(body) {
        let id = body.id
        let userId = body.userId
        let amount = body.amount
        let seedId = body.seedId

        let tmp = await user.findUserById(userId)
        if (tmp == null) {
            throw new NotFound("User does not exist");
        }   
        let cartData = await cart.findCartById(id)
        if (cartData == null) {
            throw new NotFound("Cart does not exist");
        }  
        let seedData = await seed.seedById(cartData.dataValues.seedId)
        if (seedId != undefined) {

            tmp = await seed.seedById(seedId)
            if (tmp == null){
                throw new NotFound("New seed does not exist");
            }
            let price = tmp.dataValues.price * amount;
            let result =  cart.changeCartSeed(id,seedId,amount,price);
            return result[0]
        }  
        let price = seedData.dataValues.price * amount;
        return await cart.changeSeedsAmount(id,amount,price)[0];
    }
}


module.exports = new Cart();