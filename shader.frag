#version 450

layout(binding = 1) uniform sampler2D diffuseTexture;
layout(binding = 2) uniform sampler2D directionalLightShadowMap;

layout(binding = 3) uniform LightUBO {
	vec3 lightPosition;
	vec3 viewPosition;
} lightUBO;

layout(location = 0) out vec4 outColor;

layout(location = 1) in VS_OUT {
	vec3 fragmentPosition;
	vec3 normal;
	vec2 textureCoordinates;
	vec4 fragmentPositionLightSpace;
} fs_in;

float ComputeShadow(vec4 fragmentPositionLightSpace) {
	vec3 projectiveCoordinates = fragmentPositionLightSpace.xyz / fragmentPositionLightSpace.w;
	projectiveCoordinates = projectiveCoordinates * 0.5 + 0.5;
	float closestDepth = texture(directionalLightShadowMap, projectiveCoordinates.xy).r;
	float currentDepth = projectiveCoordinates.z;
	float shadow = currentDepth > closestDepth ? 1.0 : 0.0;

	return shadow;
}

void main() {
 	vec3 color = texture(diffuseTexture, fs_in.textureCoordinates).rgb;
	vec3 normal = normalize(fs_in.normal);
	vec3 lightColor = vec3(1.0);

	vec3 ambient = 0.05 * lightColor;

	vec3 lightDirection = normalize(lightUBO.lightPosition - fs_in.fragmentPosition);
	float diffuseIntensity = max(dot(lightDirection, normal), 0.0);
	vec3 diffuse = diffuseIntensity * lightColor;

	vec3 viewDirection = normalize(lightUBO.viewPosition - fs_in.fragmentPosition);
	float specularIntensity = 0.0;
	vec3 halfWayDirection = normalize(lightDirection + viewDirection);
	specularIntensity = pow(max(dot(normal, halfWayDirection), 0.0), 64.0);
	vec3 specular = specularIntensity * lightColor;

	float shadow = ComputeShadow(fs_in.fragmentPositionLightSpace);
	vec3 lighting = (ambient + (1.0 - shadow) * (diffuse + specular)) * color;

	outColor = vec4(lighting, 1.0);

	// float depth = texture(directionalLightShadowMap, fs_in.textureCoordinates).r;
	// outColor = vec4(1.0 - (1.0 - depth) * 100.0);

	// vec3 projectiveCoordinates = fs_in.fragmentPositionLightSpace.xyz / fs_in.fragmentPositionLightSpace.w;
	// projectiveCoordinates = projectiveCoordinates * 0.5 + 0.5;
	// float closestDepth = texture(directionalLightShadowMap, projectiveCoordinates.xy).r;
//	outColor = vec4(projectiveCoordinates.x, projectiveCoordinates.y, 0.0, 1.0);
	// float shadow = ComputeShadow(fs_in.fragmentPositionLightSpace);
	// outColor = vec4(shadow, shadow, shadow, 1.0);
}
