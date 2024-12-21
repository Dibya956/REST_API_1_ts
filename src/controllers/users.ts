import express from "express";
import { deleteUserById, getUsers, getUserById } from "../db/users";

export const getAllUsers: any = async (req: express.Router, res: express.Response) => {
    try{
        const users = await getUsers();
        return res.status(200).json(users)
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(400);
    }
}

export const deleteUser: any = async (req: express.Request, res: express.Response) => {
    try{
        const { id } = req.params;
        const deleteUser = await deleteUserById(id);
        return res.json(deleteUser);
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(400);
    }
} 

export const updateUser: any = async (req: express.Request, res: express.Response) => {
    try{
        const { id } = req.params;
        const { username } = req.body;

        if (!username) {
            return res.sendStatus(400);
        }

        const user = await getUserById(id)

        user.username = username;
        await user.save();

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}