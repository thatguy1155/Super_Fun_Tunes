const express = require('express')
const router = express.Router()
const db = require('../../config/db.js')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Music = require("../model/Music");

//here we have all music-related queries 

exports.getAllMusic = async (req, res) => {
  try {
    let music = await Music.findAll();
    res.status(200).json(music);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addNewMusic = async (req,res) => {
    let { title, artist, music } = req.body
    Music.__factory = {autoIncrementField: 'id'}
    Music.id = ''
  try{
    let newMusic = await Music.create({
      id: Music.id,
      title,
      artist,
      music:JSON.stringify(req.file)
    })
    res.status(200).json({data:newMusic});
  } catch (err) {
    res.status(500).json(err);
  }
     
}


exports.deleteMusic = async (req, res) => {
  try {
    
    const id = req.params.musicId;
    
    let result = await Music.destroy({
      where:{id: id} });
    res.status(200).json(result);
  } catch (err) {
    console.log(id)
    res.status(500).json(err);
  }
};

exports.editMusic = async (req, res) => {
  let { title, artist, music } = req.body
  try {
    
  const id = req.params.musicId;
  let updated = await Music.update(
    {title: title,
    artist: artist},
    {where: {id:id}}
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
};

