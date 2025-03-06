import Item from "../models/item.js";

export function getAllItems(req, res) {
    Item.find().then(
        (items) => {
            res.json(items);
        }
    ).catch(
        () => {
            res.json({
                message: "Error"
            });
        }
    )
}

export function saveItem(req, res) {
    const item = new Item(req.body);
    Item.save().then(
        () => {
            res.json({
                message: "Item saved"
            });
        }
    ).catch(
        () => {
            res.json({
                message: "Error"
            });
        }
    )
}

export function getGoodItems(req, res) {
    res.json({
        message: "Good items"
    }); 
}
export function searchItems(req, res) {
    const name= req.params.name;
    Item.find(
        {
            name: name
        }
    ).then(
        (items) => {
            res.json(items);
        }
    ).catch(
        () => {
            res.json({
                message: "Error"
            }); 
        }
    )       
}