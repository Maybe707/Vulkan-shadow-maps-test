#version 450

// #extension GL_ARB_separate_shader_objects : enable
// #extension GL_ARB_shading_language_420pack : enable

layout(set = 0, binding = 0) uniform UniformBufferObject {
	mat4 model;
    mat4 view;
    mat4 proj;
} ubo;

layout(location = 0) in vec3 inPosition;
layout(location = 1) in vec3 inNormal;
layout(location = 2) in vec2 inTextureCoordinate;

void main() {
	// if (gl_VertexIndex % 2 == 0) {
	// 	gl_Position = vec4(0.5, 0.5, 0.5, 1.0);
	// 	} else {
	// 	gl_Position = vec4(0.7, 0.7, 0.7, 1.0);
	// 	}
    gl_Position = ubo.proj * ubo.view * ubo.model * vec4(inPosition, 1.0);
//	gl_Position = vec4(inPosition, 1.0);
	// outFragmentPosition = vec3(ubo.model * vec4(inPosition, 1.0));
    // outFragmentNormal = inNormal;
    // outFragmentTextureCoordinate = inTextureCoordinate;
}


