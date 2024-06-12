"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
class PostRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombreProyecto, descripcion, tecnologias, estado, fechaInicio, fechaFinal } = req.body;
            const newProject = new User_1.default({ nombreProyecto, descripcion, tecnologias, estado, fechaInicio, fechaFinal });
            yield newProject.save();
            return res.json({ status: res.status });
        });
    }
    readPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allPost = yield User_1.default.find();
            return res.json({ status: 200, miPost: allPost });
        });
    }
    readPostId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const allPostId = yield User_1.default.findById(id);
            return res.json({ status: 200, miPost: allPostId });
        });
    }
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const post = yield User_1.default.findByIdAndUpdate(id, req.body);
            return res.json({ status: 200, miPost: post });
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const post = yield User_1.default.findByIdAndRemove(id);
            return res.json({ status: 200, miPost: post });
        });
    }
    routes() {
        this.router.post("/", this.createPost);
        this.router.get("/", this.readPost);
        this.router.get("/:id", this.readPostId);
        this.router.put("/:id", this.updatePost);
        this.router.delete("/:id", this.deletePost);
    }
}
const postRoutes = new PostRouter();
exports.default = postRoutes.router;
/**
import { Request, Response, Router } from "express";
import Post from "../models/Post";
import { promises } from "dns";

class PostRouter{

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    public async createPost(req: Request, res: Response): Promise<void> {
        const { nombreProyecto, descripcion, tecnologias, estado, fechaInicio, fechaFinal } = req.body;
        const newProject = new Post({ nombreProyecto, descripcion, tecnologias, estado, fechaInicio, fechaFinal });
        await newProject.save();
        res.json({ status: res.status });
    }

    public async readPost (req: Request, res:Response):Promise<void>{
        const allPost = await Post.find();
        res.json({status: 200, miPost: allPost });
    }

    public async readPostId (req: Request, res:Response):Promise<void>{
        const { id } = req.params;
        const allPostId = await Post.findById(id);
        res.json({status: 200, miPost: allPostId });
    }
    
    public async updatePost (req: Request, res:Response):Promise<void>{
        const { id } = req.params;
        const post = await Post.findByIdAndUpdate(id, req.body);
        res.json({status: 200, miPost: post });
    }

    public async deletePost (req: Request, res:Response):Promise<void>{
        const { id } = req.params;
        const post = await Post.findByIdAndRemove(id, req.body)
        res.json({status: 200, miPost: post });
    }

    routes(){
        this.router.post("/", this.createPost);
        this.router.get("/", this.readPost);
        this.router.put("/:id", this.updatePost);
        this.router.delete("/:id", this.deletePost);
        this.router.get("/:id", this.readPostId);
    }
        
}

const postRoutes = new PostRouter();

export default postRoutes.router;
*/
