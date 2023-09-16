#ifndef WINDOW_X_VULKAN
#define WINDOW_X_VULKAN

#include <X11/Xlib.h>
#include <GL/gl.h>
#include <GL/glx.h>
#include "IWindow.hpp"

namespace GLVM::core
{    
    class WindowXVulkan : public IWindow
    {
        int iNum_Fbc_ = 0;
        GLXContext (*pGLXCreateContextAttribsARB_) (Display*, GLXFBConfig,
                                                  GLXContext, Bool, const int*) = 0;
        GLXContext Context_;
        XWindowAttributes GWindow_Attributes_;
        Window Root_Window_;
        XSetWindowAttributes Set_Window_Attributes_;
        Colormap Color_Map_;
        XVisualInfo* pVisual_;
        GLXFBConfig* pFbc_;
		GLXDrawable Drawable;
        
        //XWindowAttributes gwa_;

    public:
        Display* pDisp_;
        Window Win_;
        
        WindowXVulkan();
        ~WindowXVulkan();
        
        Window GetWindow();
        Display* GetDisplay();
        void CursorLock(int _x_position, int _y_position, int* _x_offset, int* _y_offset) override;
        void SwapBuffers() override;
        void ClearDisplay() override;
        bool HandleEvent(CEvent& _Event) override;
        void Close() override;
    };
}
    
#endif


