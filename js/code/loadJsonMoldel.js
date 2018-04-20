        function loadHouseFromJson(linkJson){
            
                    var directionsEnv1  = ["texture/EnvMaps/Env0/env0_1.png", "texture/EnvMaps/Env0/env0_2.png","texture/EnvMaps/Env0/env0_3.png", "texture/EnvMaps/Env0/env0_4.png","texture/EnvMaps/Env0/env0_5.png","texture/EnvMaps/Env0/env0_6.png"];
   
                    var textEnv = new THREE.CubeTextureLoader().load( directionsEnv1 );  
            
            
                var objectLoader = new THREE.ObjectLoader(manager);
				objectLoader.load(linkJson, function ( obj ) {
                    var i =0,j=0;
                    obj.traverse( function ( child ) {
                    
					if ( child instanceof THREE.Mesh ) {
                        var metalness = 0, roughness = 1;var envMapText = textEnv;
// vat lieu khung cua
                     if(child.name.indexOf("arch_Cua kinh") != -1){
                          metalness = 0.95, roughness = 0.08;
                     }   
                        
                    if(child.name === "arch_Tuong go_SubMesh 0"  || child.name === "arch_Cua phong012_SubMesh 0" || child.name === "arch_Cua phong010_SubMesh 0" || child.name === "arch_Cua phong011_SubMesh 0" || child.name === "cMat_Da' ke TV 1_SubMesh 0" || child.name === "cMat_Sofa 1_SubMesh 0" || child.name === "cMat_Bench 1_SubMesh 1" || child.name === "cMat_Ban pk 1_SubMesh 2" || child.name === "fur_Ban001_SubMesh 1" || child.name === "fur_Ban_SubMesh 0" ){
                        metalness = 0.3, roughness = 0.3;
                    }
                    if(child.name === "fur_Tab_SubMesh 0" || child.name === "cMat_Ban pk 1_SubMesh 1" || child.name === "fur_minimal deco1_SubMesh 0" ){
                        metalness = 0, roughness = 0.4;
                    }
                    if(child.name === "fur_Bat_LOD001_SubMesh 0" ){
                        metalness = 0, roughness = 0.03;
                    }
                        
// vat lieu san nha
                    if(child.name === "floor_San gach_SubMesh 0"  || child.name === "floor_San gach beboi_SubMesh 0" ){
                        metalness = 0.1, roughness = 0.15;
                    }
                        
// vat lieu ghe da(leather)                    
                    if(child.name === "cMat_Armchair 1_SubMesh 1"  || child.name === "cMat_Bench 1_SubMesh 0" ){
                        metalness = 0.2, roughness = 1;
                    }
                    
                    if(child.name === "arch_Stair1_SubMesh 0" ){
                        metalness = 0.2, roughness = 0.15;
                    }
                    if(child.name === "arch_Cua kinh 018_SubMesh 1"  || child.name === "arch_Cua kinh 000_SubMesh 1" ){
                        metalness = 0.9, roughness = 0.01;
                    }
// vat lieu inox   
                        
                        if(child.name === "cMat_Armchair 1_SubMesh 0" || child.name ==="fur_Ban001_SubMesh 0" || child.name === "cMat_Den cay 1_SubMesh 0" || child.name === "fur_Ban_SubMesh 0" || child.name === "fur_TV 4K Bravia x900C_SubMesh 2" || child.name === "fur_Ban_SubMesh 1" || child.name === "arch_Cua phong010_SubMesh 1" || child.name === "arch_Tu quan ao_SubMesh 1" || child.name === "arch_Cua phong012_SubMesh 1"){
                         metalness = 0.8, roughness = 0.3;
                        envMapText = textEnv;
                    }
                        
                        if(child.name.indexOf("arch_Den chum_SubMesh 3") != -1 || child.name.indexOf("arch_dowlight00") != -1 || child.name.indexOf("arch_dowlight doi 00") != -1){
                          metalness = 0.8, roughness = 0.3;
                          envMapText = textEnv;
                          
                     } 
                        
                    if(child.name === "cMat_Da' ke TV 1_SubMesh 0" || child.name === "arch_Stair1_SubMesh 0"){
                        envMapText = textEnv;
                    }
                        
                       var material = new THREE.MeshStandardMaterial({
                            map:child.material.map,
                            metalness : metalness,
                            roughness : roughness,
                            color : child.material.color,
                            normalMap : child.material.normalMap,
                            lightMap : child.material.lightMap,
                            envMap: envMapText,
                            name : "" + i,
                            lightMapIntensity :2.2,
                         
                        });                  
                       i++;j++;
  
                       
                    if(child.name.indexOf("kinh") == -1 && child.name.indexOf("TV") == -1){
                        child.material = material;
                    }
                       

					}

				} );
                    
                    
                    
                    obj.position.set(0,0,0);
                    
				 	/*groupObject.add( obj );*/
                    return obj;
                    
				} );
            }