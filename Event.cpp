#include "Event.hpp"
#include "Stack.hpp"

namespace GLVM::core
{
    CEvent::CEvent()
    {
    }
    
    EEvents& CEvent::GetEvent()
    {
        return eEvent_;
    }

    void CEvent::SetEvent(EEvents _eEvent)
    {
        eEvent_ = _eEvent;
    }

	void CEvent::SetLastEvent(CStack _Stack)
	{
		switch(_Stack.Pop())
		{
		case GLVM::core::eMOVE_RIGHT:
			SetEvent(GLVM::core::EEvents::eMOVE_RIGHT);
			break;
		case GLVM::core::eMOVE_LEFT:
			SetEvent(GLVM::core::EEvents::eMOVE_LEFT);
			break;
		case GLVM::core::eMOVE_BACKWARD:
			SetEvent(GLVM::core::EEvents::eMOVE_BACKWARD);
			break;
		case GLVM::core::eMOVE_FORWARD:
			SetEvent(GLVM::core::EEvents::eMOVE_FORWARD);
			break;
        case GLVM::core::eMOUSE_LEFT_BUTTON:
			SetEvent(GLVM::core::EEvents::eMOUSE_LEFT_BUTTON);
			break;
		default:
			break;
		}
	}
}
