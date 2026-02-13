import Media from './Media'
import { Plane, Transform } from 'ogl'
import map from 'lodash/map'

export default class {
  constructor ({ gl, scene }) {
    this.group = new Transform()
    this.gl = gl
    this.medias = document.querySelectorAll('.home_gallery_media_image')

    this.createGeometry()
    this.createGallery()

    this.group.setParent(scene)
  }

  createGeometry () {
    this.geometry = new Plane(this.gl)
  }

  createGallery () {
    map(this.medias, (element, index) => {
      return new Media({
        element,
        geometry: this.geometry,
        gl: this.gl,
        index,
        scene: this.group
      })
    })
  }
}
