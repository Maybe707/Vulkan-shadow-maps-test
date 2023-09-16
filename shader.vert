#version 450

layout(binding = 0) uniform UniformBufferObject {
    mat4 model;
    mat4 view;
    mat4 projection;
	mat4 lightSpaceMatrix;
} ubo;

layout(location = 0) in vec3 inPosition;
layout(location = 1) in vec3 inNormal;
layout(location = 2) in vec2 inTexCoordinates;

layout(location = 1) out VS_OUT {
	vec3 fragmentPosition;
	vec3 normal;
	vec2 textureCoordinates;
	vec4 fragmentPositionLightSpace;
} vs_out;

void main() {
	vs_out.fragmentPosition = vec3(ubo.model * vec4(inPosition, 1.0));
//	vs_out.normal = transpose(inverse(mat3(ubo.model))) * inNormal;
	vs_out.normal = mat3(ubo.model) * inNormal;
	vs_out.textureCoordinates = inTexCoordinates;
	vs_out.fragmentPositionLightSpace = ubo.lightSpaceMatrix * vec4(vs_out.fragmentPosition, 1.0);
	gl_Position = ubo.projection * ubo.view * ubo.model * vec4(inPosition, 1.0);
}
