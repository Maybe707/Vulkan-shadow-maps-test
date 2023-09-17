#version 450

layout (binding = 1) uniform sampler2D shadowMap;

layout (location = 0) out vec4 outFragColor;

layout (location = 0) in vec3 fragmentPosition;
layout (location = 1) in vec3 inNormal;
layout (location = 2) in vec3 inColor;
layout (location = 3) in vec4 fragmentPositionLightSpace;
layout (location = 4) in vec3 inLightPosition;
layout (location = 5) in vec3 inViewPosition;

float computeShadows(vec4 fragmentPositionLightSpace) {
	vec3 projectiveCoordinates = fragmentPositionLightSpace.xyz / fragmentPositionLightSpace.w;
	projectiveCoordinates = projectiveCoordinates * 0.5 + 0.5;

	float currentDepth = projectiveCoordinates.z;
	float closestDepth = texture(shadowMap, projectiveCoordinates.xy).r;

	vec3 normal = normalize(inNormal);
	vec3 lightDirection = normalize(inLightPosition - fragmentPosition);
	float bias  = max(0.01 * (1.0 - dot(normal, lightDirection)), 0.005);
	float shadow = currentDepth - bias > closestDepth ? 1.0 : 0.0;

	if(projectiveCoordinates.z > 1.0)
		shadow = 0.0;

	return shadow;
}

void main()
{
	vec3 lightColor = vec3(1.0f, 1.0f, 1.0f);
	float ambientStrength = 0.5;
	vec3 ambient = ambientStrength * lightColor;

	vec3 normal = normalize(inNormal);
	vec3 lightDirection = normalize(inLightPosition - fragmentPosition);

	float diff = max(dot(normal, lightDirection), 0.0);
	vec3 diffuse = diff * lightColor;

	float shadow = computeShadows(fragmentPositionLightSpace);
	vec3 result = (1.0 - shadow) * (ambient * diffuse) * inColor;
	outFragColor = vec4(result, 1.0);

//	outFragColor = vec4(normal * 0.5 + vec3(0.5), 1.0);
}


