#version 450

layout (set = 0, binding = 1) uniform samplerCube shadowMap;

layout (location = 0) out vec4 outFragColor;

layout (location = 0) in vec3 fragmentPosition;
layout (location = 1) in vec3 inNormal;
layout (location = 2) in vec2 inTextureCoordinates;
layout (location = 3) in vec4 fragmentPositionLightSpace;
layout (location = 4) in vec3 inLightPosition;
layout (location = 5) in vec3 inViewPosition;

float computeShadows(vec4 fragmentPositionLightSpace) {
	vec3 projectiveCoordinates = fragmentPositionLightSpace.xyz / fragmentPositionLightSpace.w;
	projectiveCoordinates = projectiveCoordinates * 0.5 + 0.5;

	float currentDepth = projectiveCoordinates.z;
	float closestDepth = texture(shadowMap, projectiveCoordinates.xyz).r;

	vec3 normal = normalize(inNormal);
	vec3 lightDirection = normalize(inLightPosition - fragmentPosition);
	float bias  = max(0.01 * (1.0 - dot(normal, lightDirection)), 0.005);
	float shadow = currentDepth - bias > closestDepth ? 1.0 : 0.0;

	if(projectiveCoordinates.z > 1.0)
		shadow = 0.0;

	return shadow;

//	return 0.0;
}

void main()
{
	vec3 lightColor = vec3(1.0f, 1.0f, 1.0f);
	float ambientStrength = 0.3;
	vec3 ambient = ambientStrength * lightColor;
	
	vec3 normal = normalize(inNormal);
	vec3 lightDirection = normalize(inLightPosition - fragmentPosition);

	float diff = max(dot(normal, lightDirection), 0.0);
	vec3 diffuse = diff * lightColor;
//	float shadow = computeShadows(fragmentPositionLightSpace);

//	outFragColor = vec4(normal * 0.5 + vec3(0.5), 1.0);
	// float depthValue = texture(shadowMap, inTextureCoordinates).r;
// 	vec3 projectiveCoordinates = fragmentPositionLightSpace.xyz / fragmentPositionLightSpace.w;
//     vec3 p = projectiveCoordinates * 0.5 + 0.5;
// //	projectiveCoordinates = projectiveCoordinates * 0.5 + 0.5;
// 	float closestDepth = texture(shadowMap, p.xyz).r;
// 	float currentDepth = projectiveCoordinates.z;
//	outFragColor = vec4(closestDepth, closestDepth, closestDepth, 1.0);
	vec3 lightToFragmentDirection = fragmentPosition - inLightPosition;
	float currentDepth = length(lightDirection);
	float closestDepth = texture(shadowMap, lightToFragmentDirection.xyz).r;
	closestDepth = closestDepth * 100.0;
	
	float bias  = max(0.01 * (1.0 - dot(normal, lightToFragmentDirection)), 0.005);
	float shadow = currentDepth - bias > closestDepth ? 1.0 : 0.0;
//	outFragColor = vec4(projectiveCoordinates.z, projectiveCoordinates.z, projectiveCoordinates.z, 1.0);
//	outFragColor = vec4(projectiveCoordinates.xy, 0.0, 1.0);
	vec3 result = (1.0 - shadow) * (ambient * diffuse);
	outFragColor = vec4(result, 1.0);
	// if (shadow > 0)
//	outFragColor = vec4(1.0, 1.0, 1.0, 1.0);
	// else
	// 	outFragColor = vec4(0.0, 0.0, 1.0, 1.0);
	// outFragColor = vec4(vec3(depthValue), 1.0);
}


