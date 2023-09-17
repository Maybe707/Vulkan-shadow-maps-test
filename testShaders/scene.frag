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

	float closestDepth = texture(shadowMap, projectiveCoordinates.xy).r;
	float currentDepth = projectiveCoordinates.z;

	vec3 normal = normalize(inNormal);
	vec3 lightDirection = normalize(inLightPosition - fragmentPosition);
	float bias = max(0.05 * (1.0 - dot(normal, lightDirection)), 0.005);
	float shadow = currentDepth - bias > closestDepth ? 1.0 : 0.0;

	if(projectiveCoordinates.z > 1.0)
		shadow = 0.0;
	
	return shadow;
}

void main()
{
	vec3 color = inColor;
	vec3 normal = normalize(inNormal);
	vec3 lightColor = vec3(0.6);

	vec3 ambient = 0.3 * lightColor;

	vec3 lightDirection = normalize(inLightPosition - fragmentPosition);
	float diff = max(dot(lightDirection, normal), 0.0);
	vec3 diffuse = diff * lightColor;

	vec3 viewDirection = normalize(inViewPosition - fragmentPosition);
	vec3 reflectDirection = reflect(-lightDirection, normal);
	float spec = 0.0;

	vec3 halfwayDirection = normalize(lightDirection + viewDirection);
	spec = pow(max(dot(normal, halfwayDirection), 0.0), 64.0);
	vec3 specular = spec * lightColor;

	float shadow = computeShadows(fragmentPositionLightSpace);
	vec3 lightning = (ambient + (1.0 - shadow) * (diffuse + specular)) * color;

	outFragColor = vec4(lightning, 1.0);
}


