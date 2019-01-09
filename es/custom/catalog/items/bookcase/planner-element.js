import * as Three from 'three';
import React from 'react';

var WIDTH = 80;
var DEPTH = 80;
var HEIGHT = 200;

var textureLoader = new Three.TextureLoader();
var woodMaterial = textureLoader.load(require('./wood.jpg'));
var bookTexture1 = textureLoader.load(require('./bookTexture1.jpg'));
var bookTexture2 = textureLoader.load(require('./bookTexture2.jpg'));
var bookTexture3 = textureLoader.load(require('./bookTexture3.jpg'));

var objectMaxLOD = makeObjectMaxLOD();
var objectMinLOD = makeObjectMinLOD();

function makeObjectMaxLOD() {

  var bookcase = new Three.Mesh();

  //Bookcase
  var backGeometry = new Three.BoxGeometry(0.03, 2, 0.8);
  var wood = new Three.MeshPhongMaterial({ map: woodMaterial });
  var backside = new Three.Mesh(backGeometry, wood);
  backside.position.set(0, 1, 0);
  bookcase.add(backside);

  var sideGeometry = new Three.BoxGeometry(0.3, 2, 0.03);
  var side1 = new Three.Mesh(sideGeometry, wood);
  side1.position.set(0.15, 1, 0.4);
  bookcase.add(side1);

  var side2 = new Three.Mesh(sideGeometry, wood);
  side2.position.set(0.15, 1, -0.4);
  bookcase.add(side2);

  var bottomGeometry = new Three.BoxGeometry(0.3, 0.03, 0.8);
  var bottomPanel = new Three.Mesh(bottomGeometry, wood);
  bottomPanel.position.set(0.15, 2, 0);
  bookcase.add(bottomPanel);

  var topGeometry = new Three.BoxGeometry(0.3, 0.03, 0.8);
  var topPanel = new Three.Mesh(topGeometry, wood);
  topPanel.position.set(0.15, 0.015, 0);
  bookcase.add(topPanel);

  //shelves
  for (var i = 1; i < 5; i++) {
    var shelveGeometry = new Three.BoxGeometry(0.3, 0.03, 0.8);
    var shelve = new Three.Mesh(shelveGeometry, wood);
    shelve.position.set(0.15, 0.015 + i * 0.4, 0);
    bookcase.add(shelve);
  }

  function choiceTexture() {

    return Math.floor(Math.random() * 3);
  }

  //book
  var bookGeometry = new Three.BoxGeometry(0.24, 0.32, 0.76);

  var bookMaterial = [new Three.MeshLambertMaterial({ map: bookTexture1 }), new Three.MeshLambertMaterial({ map: bookTexture2 }), new Three.MeshLambertMaterial({ map: bookTexture3 })];

  var book1 = new Three.Mesh(bookGeometry, bookMaterial[choiceTexture()]);
  book1.position.set(0.15, 0.59, 0);
  bookcase.add(book1);

  var book2 = new Three.Mesh(bookGeometry, bookMaterial[choiceTexture()]);
  book2.position.set(0.15, 0.99, 0);
  bookcase.add(book2);

  var book3 = new Three.Mesh(bookGeometry, bookMaterial[choiceTexture()]);
  book3.position.set(0.15, 0.19, 0);
  bookcase.add(book3);

  var book4 = new Three.Mesh(bookGeometry, bookMaterial[choiceTexture()]);
  book4.position.set(0.15, 1.39, 0);
  bookcase.add(book4);

  var book5 = new Three.Mesh(bookGeometry, bookMaterial[choiceTexture()]);
  book5.position.set(0.15, 1.79, 0);
  bookcase.add(book5);

  return bookcase;
}

function makeObjectMinLOD() {

  var bookcase = new Three.Mesh();

  var textureLoader = new Three.TextureLoader();

  var woodMaterial = textureLoader.load(require('./wood.jpg'));

  //Bookcase
  var backGeometry = new Three.BoxGeometry(0.03, 2, 0.8);
  var wood = new Three.MeshPhongMaterial({ map: woodMaterial });
  var backside = new Three.Mesh(backGeometry, wood);
  backside.position.set(0, 1, 0);
  bookcase.add(backside);

  var sideGeometry = new Three.BoxGeometry(0.3, 2, 0.03);
  var side1 = new Three.Mesh(sideGeometry, wood);
  side1.position.set(0.15, 1, 0.4);
  bookcase.add(side1);

  var side2 = new Three.Mesh(sideGeometry, wood);
  side2.position.set(0.15, 1, -0.4);
  bookcase.add(side2);

  var bottomGeometry = new Three.BoxGeometry(0.3, 0.03, 0.8);
  var bottomPanel = new Three.Mesh(bottomGeometry, wood);
  bottomPanel.position.set(0.15, 2, 0);
  bookcase.add(bottomPanel);

  var topGeometry = new Three.BoxGeometry(0.3, 0.03, 0.8);
  var topPanel = new Three.Mesh(topGeometry, wood);
  topPanel.position.set(0.15, 0.015, 0);
  bookcase.add(topPanel);

  //shelves
  for (var i = 1; i < 5; i++) {
    var shelveGeometry = new Three.BoxGeometry(0.3, 0.03, 0.8);
    var shelve = new Three.Mesh(shelveGeometry, wood);
    shelve.position.set(0.15, 0.015 + i * 0.4, 0);
    bookcase.add(shelve);
  }

  return bookcase;
}

export default {
  name: 'bookcase',
  prototype: 'items',

  info: {
    tag: ['furnishings', 'wood'],
    title: 'bookcase',
    description: 'bookcase',
    image: require('./bookcase.png')
  },

  properties: {
    altitude: {
      label: 'altitude',
      type: 'length-measure',
      defaultValue: {
        length: 0,
        unit: 'cm'
      }
    }
  },

  render2D: function render2D(element, layer, scene) {

    var angle = element.rotation + 90;

    var textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }

    var rect_style = { stroke: element.selected ? '#0096fd' : '#000', strokeWidth: '2px', fill: '#84e1ce' };

    return React.createElement(
      'g',
      { transform: 'translate(' + -WIDTH / 2 + ',' + -DEPTH / 2 + ')' },
      React.createElement('rect', { key: '1', x: '0', y: '0', width: WIDTH, height: DEPTH, style: rect_style }),
      React.createElement(
        'text',
        { key: '2', x: '0', y: '0',
          transform: 'translate(' + WIDTH / 2 + ', ' + DEPTH / 2 + ') scale(1,-1) rotate(' + textRotation + ')',
          style: { textAnchor: 'middle', fontSize: '11px' } },
        element.type
      )
    );
  },

  render3D: function render3D(element, layer, scene) {

    var newAltitude = element.properties.get('altitude').get('length');

    /**************** lod max ******************/

    var bookcaseMaxLOD = new Three.Object3D();
    bookcaseMaxLOD.add(objectMaxLOD.clone());

    var value = new Three.Box3().setFromObject(bookcaseMaxLOD);

    var deltaX = Math.abs(value.max.x - value.min.x);
    var deltaY = Math.abs(value.max.y - value.min.y);
    var deltaZ = Math.abs(value.max.z - value.min.z);

    bookcaseMaxLOD.rotation.y += Math.PI / 2;
    bookcaseMaxLOD.position.y += newAltitude;
    bookcaseMaxLOD.position.z += WIDTH / 2;
    bookcaseMaxLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /**************** lod min ******************/

    var bookcaseMinLOD = new Three.Object3D();
    bookcaseMinLOD.add(objectMinLOD.clone());
    bookcaseMinLOD.rotation.y += Math.PI / 2;
    bookcaseMinLOD.position.y += newAltitude;
    bookcaseMinLOD.position.z += WIDTH / 2;
    bookcaseMinLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /**** all level of detail ***/

    var lod = new Three.LOD();

    lod.addLevel(bookcaseMaxLOD, 200);
    lod.addLevel(bookcaseMinLOD, 900);
    lod.updateMatrix();
    lod.matrixAutoUpdate = false;

    if (element.selected) {
      var bbox = new Three.BoxHelper(lod, 0x99c3fb);
      bbox.material.linewidth = 5;
      bbox.renderOrder = 1000;
      bbox.material.depthTest = false;
      lod.add(bbox);
    }

    return Promise.resolve(lod);
  }

};