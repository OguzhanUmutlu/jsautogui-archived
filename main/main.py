import json

import pyautogui

while True:
    # TODO: Tween/Easing Functions
    inp = input()
    _json = json.loads(inp)
    if "id" not in _json or "action" not in _json:
        continue
    _id = _json["id"]
    action = _json["action"]


    def dic(*a):
        d = dict()
        for i in a:
            if g(i) is not None:
                d[i] = g(i)
        return d


    def lis(*a):
        l = list()
        for i in a:
            if g(i) is not None:
                l.append(g(i))
        return l


    def g(n):
        if n not in _json:
            return None
        return _json[n]


    def pr(st):
        print(f"{_id} {st}")


    def print_point(point):
        pr(":".join(map(str, point)))


    def none_int(i):
        return None if i == "None" else int(i)


    def none_str(i):
        return None if i == "None" else str(i)


    if action == "position":
        print_point(pyautogui.position())
    elif action == "size":
        print_point(pyautogui.size())
    elif action == "on-screen":
        pr(pyautogui.onScreen(*lis("x", "y")))
    elif action == "PAUSE":
        pyautogui.PAUSE = g("value")
    elif action == "FAILSAFE":
        pyautogui.FAILSAFE = g("value")
    elif action == "move-to":
        pyautogui.moveTo(*lis("x", "y"), **dic("duration"))
    elif action == "move":
        pyautogui.move(*lis("x", "y"), **dic("duration"))
    elif action == "move-rel":
        pyautogui.moveRel(*lis("x", "y"), **dic("duration"))
    elif action == "click":
        pyautogui.click(**dic("x", "y", "clicks", "interval", "button"))
    elif action == "v-scroll":
        pyautogui.vscroll(*lis("value"), **dic("x", "y"))
    elif action == "h-scroll":
        pyautogui.hscroll(*lis("value"), **dic("x", "y"))
    elif action == "mouse-down":
        pyautogui.mouseDown(**dic("x", "y", "button"))
    elif action == "mouse-up":
        pyautogui.mouseUp(**dic("x", "y", "button"))
    elif action == "type-write":
        pyautogui.typewrite(*lis("text"), **dic("interval"))  # text can be a string or an array of strings
    elif action == "hotkey":
        pyautogui.hotkey(*lis("keys"), **dic("interval"))
    elif action == "key-down":
        pyautogui.keyDown(*lis("key"))
    elif action == "key-up":
        pyautogui.keyUp(*lis("key"))
    elif action == "press":
        pyautogui.press(*lis("key"))
    elif action == "alert-js":
        pyautogui.alert(*lis("text"))
    elif action == "alert":
        pyautogui.alert(**dic("text", "title", "button"))
    elif action == "confirm-js":
        pr(pyautogui.confirm(*lis("text")))
    elif action == "confirm":
        res = pyautogui.confirm(**dic("text", "title", "buttons"))
        if res is None:
            pr("fail:None")
        else:
            pr("success:" + res)
    elif action == "prompt-js":
        pr(pyautogui.prompt(*lis("text")))
    elif action == "prompt":
        res = pyautogui.prompt(**dic("text", "title", "default"))
        if res is None:
            pr("fail:None")
        else:
            pr("success:" + res)
    elif action == "password-js":
        pr(pyautogui.password(*lis("text")))
    elif action == "password":
        res = pyautogui.password(**dic("text", "title", "default", "mask"))
        if res is None:
            pr("fail:None")
        else:
            pr("success:" + res)
    elif action == "screenshot":
        pr(pyautogui.screenshot(*lis("file"), **dic("region")))
    elif action == "locate-on-screen":
        try:
            print_point(pyautogui.locateOnScreen(*lis("file")))
        except:
            pr("fail")
            pass
    elif action == "locate-all-on-screen":
        try:
            for p in pyautogui.locateAllOnScreen(*lis("file")):
                print_point(p)
        except:
            pr("fail")
            pass
    elif action == "locate-center-on-screen":
        try:
            print_point(pyautogui.locateCenterOnScreen(*lis("file")))
        except:
            pr("fail")
            pass
    elif action == "drag-to":
        pyautogui.dragTo(**dic("x", "y", "duration", "button"))
    elif action == "drag-rel":
        pyautogui.dragRel(**dic("x", "y", "duration", "button"))
    elif action == "drag":
        pyautogui.drag(**dic("x", "y", "duration", "button"))
    else:
        pass
    pr("success")
