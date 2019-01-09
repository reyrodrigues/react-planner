import MTLLoader from './mtl-loader';
import OBJLoader from './obj-loader';

export function loadObjWithMaterial(mtlFile, objFile, imgPath) {
  var mtlLoader = new MTLLoader();
  mtlLoader.setTexturePath(imgPath);
  var url = mtlFile;
  return new Promise(function (resolve, reject) {

    mtlLoader.load(url, function (materials) {
      materials.preload();
      var objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load(objFile, function (object) {
        return resolve(object);
      });
    });
  });
}