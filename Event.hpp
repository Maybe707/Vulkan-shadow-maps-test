#ifndef EVENT
#define EVENT

//#include "Stack.hpp"

namespace GLVM::core
{

	class CStack;
	
    /*! \enum EEvents
        \brief Realise event event types.
    */

    enum EEvents
    {
		eDEFAULT,
		eKEYRELEASE_A,
		eKEYRELEASE_D,
		eKEYRELEASE_S,
		eKEYRELEASE_W,
        eKEYRELEASE_JUMP,
        eGRAVITY_COLLISION_FLAG,
        eRENDER,
        eATACK,
        eSPAWN,
        eJUMP,
		eMOVE_FORWARD,
		eMOVE_BACKWARD,
		eMOVE_LEFT,
		eMOVE_RIGHT,
        eMOVE_DIAGONAL_FB,
        eMOVE_DIAGONAL_FL,
        eMOVE_DIAGONAL_LB,
        eMOVE_DIAGONAL_BR,
        eMOUSE_POINTER_POSITION,
        eMOUSE_LEFT_BUTTON_RELEASE,
        eMOUSE_LEFT_BUTTON,
        eGAME_LOOP_KILL,
        eEmpty,
    };

    struct SMousePointerPosition
    {
        int position_X;
        int position_Y;
        int offset_X = 0;
        int offset_Y = 0;
        float pitch;
        float yaw;
    };
    
    /*! \class Event
        \brief Realise event game system.
    */

    class CEvent
    {
        EEvents eEvent_;
    
    public:
        SMousePointerPosition mousePointerPosition;
        
        CEvent();
        EEvents& GetEvent();
        void SetEvent(EEvents _eEvent);
		void SetLastEvent(CStack _Stack);
    };


}

#endif
