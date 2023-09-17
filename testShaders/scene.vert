#version 450

layout (location = 0) in vec3 inPos;
layout (location = 1) in vec3 inNormal;
layout (location = 2) in vec3 inColor;

layout (binding = 0) uniform UBO 
{
	mat4 model;
	mat4 view;
	mat4 projection;
	mat4 lightSpace;
	vec3 lightPos;
	vec3 viewPos;
} ubo;


layout (location = 0) out vec3 fragmentPosition;
layout (location = 1) out vec3 outNormal;
layout (location = 2) out vec3 outColor;
layout (location = 3) out vec4 fragmentPositionLightSpace;
layout (location = 4) out vec3 outLightPosition;
layout (location = 5) out vec3 outViewPosition;

void main() 
{
	outColor = inColor;
	outLightPosition = ubo.lightPos;
	outNormal = mat3(ubo.model) * inNormal;
	fragmentPosition = vec3(ubo.model * vec4(inPos, 1.0));
	gl_Position = ubo.projection * ubo.view * ubo.model * vec4(inPos, 1.0);
}

