/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","./library","./Gizmo"],function(q,c,G){"use strict";var M=G.extend("sap.ui.vk.tools.MoveToolGizmo",{metadata:{library:"sap.ui.vk.tools"}});M.prototype.init=function(){if(G.prototype.init){G.prototype.init.apply(this);}this._viewport=null;this._tool=null;this._sceneGizmo=new THREE.Scene();this._gizmo=new THREE.Group();this._touchAreas=new THREE.Group();this._sceneGizmo.add(this._gizmo);this._coordinateSystem=sap.ui.vk.tools.CoordinateSystem.Local;this._nodes=[];this._matViewProj=new THREE.Matrix4();this._gizmoSize=144;this._gizmoOffset=new THREE.Vector3();function d(a,b,t){var f=144,l=window.devicePixelRatio*0.5,h=32,i=6,j=48;a.multiplyScalar(1/f);var k=new THREE.CylinderBufferGeometry(l,l,f-h,4);var m=new THREE.Matrix4().makeBasis(new THREE.Vector3(a.y,a.z,a.x),a,new THREE.Vector3(a.z,a.x,a.y));m.setPosition(a.clone().multiplyScalar((f-h)*0.5));k.applyMatrix(m);var n=new THREE.Mesh(k,new THREE.MeshBasicMaterial({color:b,transparent:true}));n.matrixAutoUpdate=false;n.userData.color=b;var o=new THREE.CylinderBufferGeometry(0,i,h,12,1);m.setPosition(a.clone().multiplyScalar(f-h*0.5));o.applyMatrix(m);var p=new THREE.Mesh(o,new THREE.MeshBasicMaterial({color:b,transparent:true}));p.matrixAutoUpdate=false;n.add(p);var r=new THREE.CylinderGeometry(j*0.5,j*0.5,j,12,1);r.applyMatrix(m);var s=new THREE.CylinderGeometry(j*0.5,j*0.2,j,12,1);m.setPosition(a.clone().multiplyScalar(f*0.5));r.merge(s,m);t.add(new THREE.Mesh(r,new THREE.MeshBasicMaterial()));return n;}function e(a,b,t){var f=new Float32Array(9);f[a]=f[b+6]=1;f[a+3]=f[b+3]=0.5;var v=new THREE.Vector3().setComponent(a,0.333);var h=new THREE.Vector3().setComponent(b,0.333);var g=new THREE.Geometry();g.vertices.push(new THREE.Vector3(),v,h,v.clone().add(h));g.faces.push(new THREE.Face3(0,2,1),new THREE.Face3(1,2,3));var m=new THREE.MeshBasicMaterial({color:0xFFFF00,opacity:0.5,transparent:true,visible:false,side:THREE.DoubleSide});var p=new THREE.Mesh(g,m);p.matrixAutoUpdate=false;p.userData.colors=f;var l=new THREE.BufferGeometry();var i=new Float32Array(9);i[a]=i[a+3]=i[b+3]=i[b+6]=0.333;l.addAttribute("position",new THREE.Float32BufferAttribute(i,3));l.addAttribute("color",new THREE.Float32BufferAttribute(f,3));var j=new THREE.Line(l,new THREE.LineBasicMaterial({vertexColors:THREE.VertexColors,transparent:true,linewidth:window.devicePixelRatio}));j.matrixAutoUpdate=false;p.add(j);var k=new THREE.Geometry();k.vertices.push(new THREE.Vector3(),v,h,v.clone().add(h));k.faces.push(new THREE.Face3(0,1,2),new THREE.Face3(2,1,3));t.add(new THREE.Mesh(k,new THREE.MeshBasicMaterial({side:THREE.DoubleSide})));return p;}this._gizmo.add(d(new THREE.Vector3(1,0,0),0xFF0000,this._touchAreas));this._gizmo.add(d(new THREE.Vector3(0,1,0),0x00FF00,this._touchAreas));this._gizmo.add(d(new THREE.Vector3(0,0,1),0x0000FF,this._touchAreas));this._gizmo.add(e(1,2,this._touchAreas));this._gizmo.add(e(2,0,this._touchAreas));this._gizmo.add(e(0,1,this._touchAreas));this._axisTitles=this._createAxisTitles();this._sceneGizmo.add(this._axisTitles);var g=new THREE.Geometry();g.vertices.push(new THREE.Vector3(),new THREE.Vector3());this._line=new THREE.LineSegments(g,new THREE.LineBasicMaterial());this._line.frustumCulled=false;this._line.visible=false;this._gizmo.add(this._line);};M.prototype.hasDomElement=function(){return false;};M.prototype.getCoordinateSystem=function(){return this._coordinateSystem;};M.prototype.setCoordinateSystem=function(a){this._coordinateSystem=a;var s=a===sap.ui.vk.tools.CoordinateSystem.Screen;var g=this._gizmo.children,t=this._touchAreas.children;g[2].visible=g[3].visible=g[4].visible=!s;t[2].visible=t[3].visible=t[4].visible=!s;this._axisTitles.children[2].visible=!s;};M.prototype.show=function(v,t){this._viewport=v;this._tool=t;this._nodes.length=0;this._updateSelection(v._viewStateManager);};M.prototype.hide=function(){this._viewport=null;this._tool=null;};M.prototype.getGizmoCount=function(){if(this._coordinateSystem===sap.ui.vk.tools.CoordinateSystem.Local){return this._nodes.length;}else{return this._nodes.length>0?1:0;}};M.prototype.getTouchObject=function(i){if(this._nodes.length===0){return null;}this._updateGizmoObjectTransformation(this._touchAreas,i);return this._touchAreas;};M.prototype.highlightHandle=function(a,h){var i,b=[];for(i=0;i<3;i++){var d=this._gizmo.children[i];var e=(a<3?i===a:((i===(a+1)%3)||(i===(a+2)%3)));b[i]=e;var f=e?0xFFFF00:d.userData.color;d.material.color.setHex(f);d.material.opacity=(e||h)?1:0.35;d.children[0].material.color.setHex(f);d.children[0].material.opacity=(e||h)?1:0.35;}for(i=3;i<6;i++){var p=this._gizmo.children[i];p.material.visible=i===a;var g=p.children[0].geometry.attributes.color;if(i===a){g.copyArray([1,1,0,1,1,0,1,1,0]);}else{g.copyArray(p.userData.colors);}g.needsUpdate=true;p.children[0].material.opacity=(i===a||h)?1:0.35;}this._axisTitles.children.forEach(function(o,i){o.material.color.setHex(b[i]?0xFFFF00:o.userData.color);o.material.opacity=b[i]||h?1:0.35;});};M.prototype.beginGesture=function(){this._matOrigin=this._gizmo.matrixWorld.clone();this._nodes.forEach(function(n){var a=n.node;n.matOrigin=a.matrixWorld.clone();n.originLocal=a.position.clone();n.origin=new THREE.Vector3().setFromMatrixPosition(a.matrixWorld);n.matParentInv=new THREE.Matrix4().getInverse(a.parent.matrixWorld);});};M.prototype.endGesture=function(){this._line.visible=false;this._tool.fireMoved({x:this._gizmoOffset.x,y:this._gizmoOffset.y,z:this._gizmoOffset.z});};M.prototype._setOffset=function(o,g){if(this._coordinateSystem===sap.ui.vk.tools.CoordinateSystem.Local){var n=this._nodes[g];var m=new THREE.Matrix4().getInverse(n.node.matrixWorld);var s=new THREE.Vector3().setFromMatrixScale(n.node.matrixWorld);var a=n.origin.clone().applyMatrix4(m);o=n.origin.clone().add(o).applyMatrix4(m).sub(a).multiply(s);}else if(this._coordinateSystem===sap.ui.vk.tools.CoordinateSystem.Screen){var b=this._viewport.getRenderer().getSize();var p=this._gizmo.position.clone().applyMatrix4(this._matViewProj);var d=this._gizmo.position.clone().add(o).applyMatrix4(this._matViewProj);o.set(Math.round((d.x-p.x)*0.5*b.width),Math.round((d.y-p.y)*0.5*b.height),0);}if(this._tool.fireEvent("moving",{x:o.x,y:o.y,z:o.z},true)){this._move(o);if(this._coordinateSystem===sap.ui.vk.tools.CoordinateSystem.Screen){o.set(new THREE.Vector3().setFromMatrixColumn(this._matOrigin,0).normalize().dot(o),new THREE.Vector3().setFromMatrixColumn(this._matOrigin,1).normalize().dot(o),0);}this._line.geometry.vertices[0].setScalar(0).sub(o);this._line.geometry.verticesNeedUpdate=true;this._line.geometry.computeBoundingBox();o.set(Math.abs(o.x),Math.abs(o.y),Math.abs(o.z));o.multiplyScalar(1/Math.max(o.x,o.y,o.z));this._line.material.color.setRGB(o.x,o.y,o.z);this._line.visible=true;}};M.prototype._move=function(o){this._gizmoOffset.copy(o);if(this._coordinateSystem===sap.ui.vk.tools.CoordinateSystem.Local){this._nodes.forEach(function(n){var f=n.node;var g=this._extractBasis(f.matrixWorld);var p=n.origin.clone();p.add(g[0].multiplyScalar(o.x)).add(g[1].multiplyScalar(o.y)).add(g[2].multiplyScalar(o.z));f.matrixWorld.setPosition(p);f.matrix.multiplyMatrices(n.matParentInv,f.matrixWorld);f.position.setFromMatrixPosition(f.matrix);}.bind(this));this._viewport._updateBoundingBoxesIfNeeded();}else{if(this._coordinateSystem===sap.ui.vk.tools.CoordinateSystem.Screen){var s=this._viewport.getRenderer().getSize();var a=this._viewport.getCamera().getCameraRef();var b=new THREE.Vector4().copy(this._gizmo.position).applyMatrix4(this._matViewProj);var d=o.x*2*b.w/(a.projectionMatrix.elements[0]*s.width);var e=o.y*2*b.w/(a.projectionMatrix.elements[5]*s.height);o.setFromMatrixColumn(a.matrixWorld,0).multiplyScalar(d);o.add(new THREE.Vector3().setFromMatrixColumn(a.matrixWorld,1).multiplyScalar(e));}this._gizmo.position.setFromMatrixPosition(this._matOrigin).add(o);this._nodes.forEach(function(n){if(!n.ignore){var f=n.node;f.matrixWorld.setPosition(n.origin.clone().add(o));f.matrix.multiplyMatrices(n.matParentInv,f.matrixWorld);f.position.setFromMatrixPosition(f.matrix);}});}this._viewport.setShouldRenderFrame();};M.prototype.move=function(o){this.beginGesture();this._move(new THREE.Vector3(o.x,o.y,o.z||0));};M.prototype.expandBoundingBox=function(b){if(this._viewport){this._expandBoundingBox(b,this._viewport.getCamera().getCameraRef());}};M.prototype.handleSelectionChanged=function(e){if(this._viewport){this._updateSelection(this._viewport._viewStateManager);}};M.prototype._updateGizmoTransformation=function(i,a){var s=this._updateGizmoObjectTransformation(this._gizmo,i);this._updateAxisTitles(this._axisTitles,this._gizmo,a,this._gizmoSize+18,s);this._line.scale.setScalar(1/(this._gizmoSize*s));};M.prototype.render=function(){if(this._nodes.length>0){var r=this._viewport.getRenderer(),a=this._viewport.getCamera().getCameraRef();this._matViewProj.multiplyMatrices(a.projectionMatrix,a.matrixWorldInverse);r.clearDepth();for(var i=0,l=this.getGizmoCount();i<l;i++){this._updateGizmoTransformation(i,a);r.render(this._sceneGizmo,a);}}};M.prototype.onBeforeRendering=function(){};M.prototype.onAfterRendering=function(){};return M;},true);
