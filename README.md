I am not involved in the ESPeasy project but if you like my work please support the ESPeasy project and consider a donation: 
https://github.com/letscontrolit/ESPEasy

If you are looking for nice styling of the espeasy ui try my css: https://github.com/chromoxdor/espeasy_custom-css

# easyfetch - dashboard for espeasy

Easyfetch is a alternative dashboard in tile optic for espeasy. It was created to have a quick and relatively simple way of visualizing data and interacting with the hardware (buttons & slider) in a browser. Especially where no bigger infrastructure like a homeautomation server is needed (the ability to write complex rules in espeasy and the ability of communication between the nodes via a simple p2p-network can often make a full blown home automation system unnecessary).

![fetch](https://user-images.githubusercontent.com/33860956/155348634-6d3e0c6f-65ff-4150-bb60-a58d0601a554.gif)


## Overview:
The Dashboard consists of different elements with different purposes:

  1. **main-section:** the tasks you have in espeasy are rendered here in tiles. There are a lot of options to customize these.
There are 3 possible categories: 
     1. big-values
     2. slider
     3. the rest: buttons and "normal" tiles

  2. **unit-menu:** Here are all the units listed, that are connected via the controller called ESPEasy P2P Networking (https://espeasy.readthedocs.io/en/latest/Controller/C013.html)
     * next to the unitname is the unitnumber.
     * the symbol "⊙" leading the unitname marks the unit wich serves the easyfetch.html 

  3. **unit-name:** the unit-name of the unit that is actual selected. next to it is the signalstrength in dBm of this unit.
     * clicking it enters fullscreen mode on supported browsers

  4. **menu and splitview buttons:** 
     * the left button opens the unit-list 
     * the right button opens the devices-page of the espeasy unit in a splitview for easier dashboard creation (on smartphones it overlays the page instead because of limited space). If long-clicked this button leaves easyfetch and directs to the tools page of the selected unit.

<img width="399" alt="main" src="https://user-images.githubusercontent.com/33860956/158618125-4e73ae1f-a0f7-4cf1-87c2-982e93c036e8.png">

## Creating a Dashboard:

Here you can see the corresponding devices page of the unit: "testesp":

<img width="740" alt="main split" src="https://user-images.githubusercontent.com/33860956/158621473-f1e1525d-5028-4299-9bc5-15b2d6bc7ff9.png">

### Install:

1. Download the fetch.html or better for limited space the fetch.html.gz to your computer. (It is also possible to name it index.htm or index.htm.gz to replace the main page)

2. Use a browser and open your ESPEasy Device at http://<ESP_DEVICE_IP>
   (Note: replace <ESP_DEVICE_IP> with your device's Local IP Address)

3. Go to the "Tools" Tab

4. Select the "Filesystem->File browser" button.

5. Press the "Upload" button.

6. Press the "Browse..." button and select the fetch.html file.

7. Press the "Upload" button.

8. Repeat steps 4-7 for the custom esp.css file if you want a custom css (e.g. darkmode). 
- the file can be downloaded from here: https://github.com/chromoxdor/espeasy_custom-css
- choose between dark only, light only and system dependent (auto)mode and and rename the file esp.css!

Use your browser to view the new dashboard: http://<ESP_DEVICE_IP>/fetch.html
You should now see all the ESPEasy device tasks and states.

### Display options:


***

**1. ordinary Tile:**
  - Each task is without further ado rendered as a tile. These tiles are arranged by their tasknumbers.
  - On the upper left is the taskname and aligned right if present are the valuenames and their values
  - These tiles (and the buttons too) can be clicked and longclicked and trigger an event which can be accessed in rules
    - if clicked short \<taskname>event and if longclicked \<taskname>long
     - rulesexample: 
       <pre><code>
       on sensorevent do
       dosomething
       endon
       </code></pre>
  - Every value of a task can have its own unit. Therefore add “?\<unit>“ to the valuename (e.g. Temperature?°C or Humidity?H)
    (Notice: ?% is not an option because you´ll get an error message in espeasy so H is translated to % when displayed.)
  - You can hide valuenames and their values: add “XX” to the itemname (e.g. HumidityXX for name and value or for hiding only the name leave 
    it empty or just name it “?°C” to keep the unit)

    <img width="500" alt="s1" src="https://user-images.githubusercontent.com/33860956/159250534-96dcd024-1d28-44d0-9174-a84390819379.png">


***

**2. Buttons:**
  - Buttons are basically ordinary tiles where the valuenames/values are not rendered
  - the have the ability to change their color depending on their state
  - there are two options to generate a button tile:
     1. Name the first value of a Task "btnState" (a button whose color is dependent of the btnState 0=no color 1=blue) or “btnStateC” (this button is independent from its state always blue)
     ![button simple](https://user-images.githubusercontent.com/33860956/159255555-d7caea8e-4913-4a4b-98b7-f9a83e5c4f3c.png)
     (the device here is a sonoff s20 and since we do not need the first button, since its the hardwarebutton, on our dahboard we can hide it with the "XX" option. the second button is the actual relay so the state changes depending on the gpio state)

     2. Name a dummy device something that consists "dButtons" and every value becomes a button. 
        - You can add an option for colorbuttons with "?C"(see picture below)
        - put "&\<unit_number>" to the send of the valuename to send this buttonevent to a specific device. (e.g. valuename "button?2" will result in this           command: `SendTo,2,"event,ButtonEvent"`)
        - put "&\A" to the send of the valuename and the event will be send to all connected nodes

         <img width="600" alt="b1" src="https://user-images.githubusercontent.com/33860956/159254570-8156aadb-2216-4cc3-88fe-a43a4747743b.png">
         <img width="200" alt="b1f" src="https://user-images.githubusercontent.com/33860956/159254576-76b425bc-58c5-4e3e-9142-5b04a39bde3a.png">

  - Alert: whenever the value of “btnState” / “btnStateC” or any value in a "dButtons" task is 2 the tile becomes red.


***

**3. Slider**

 - Slider: there are two types of slider. The “normal” slider and the “time" slider
 - Every slider calls an event when finished sliding. (e.g. “sliderevent”)
 - to create a slider name a dummy device either "vSlider", "nvSlider" or "tSlider"

    - The normal slider: There are two versions too.

         1. The slider with values displayed: name a task something consisting of “vSlider” and every item will become a Slider with values shown while sliding

         2. The slider with values hidden: name a task something consisting of “nvSlider”

    - For both kinds of slider you can set a minimum, a maximum and the steps.
    - To achieve this add ?<minimum>?<maximum>?<steps> to the itemname (e.g. slider?0?100?0.1)
      Notice: if you use this you must use it altogether. Standard values if unset are min=0 max=1023 step=1.

      <img width="600" alt="vS1" src="https://user-images.githubusercontent.com/33860956/159258001-6dcc11d5-e6cb-471e-b115-4cfb14c600e6.png">

   - The "time" slider: Name a task something consisting of “tSlider” and every item will become a "time" slider.
    - The "time" slider stores the values of both times in one number. This makes it easier to store these values with the regulator - level 
      control plugin since only one plugin for both values is needed
    - This slider has two thumbs for two time values (e.g. on and off time). Both times are stored in the corresponding taskvalue. The code 
      example shows how to make use of it:
<pre><code>
 On tSlider do
  Let,1,[tSlider#Mo_Fr#D0.0]/60
  Let,2,[tSlider#Mo_Fr#F]%60
  Let,3,[tSlider#Mo_Fr]*10000-[tSlider#Mo_Fr#F]*10000)/60
  Let,4,[var#3]%60
  Let,3,[var#3]/60
 endon

 On Clock#Time=All,"[Var#1#F]:[Var#2#D2]" do
  gpio,2,1
  endon
 On Clock#Time=All,"[Var#3#F]:[Var#4#D2]" do
  gpio,2,0
  endon
</code></pre>


<img width="600" alt="ts" src="https://user-images.githubusercontent.com/33860956/155342234-12436142-1813-47e9-a789-9c803c8763de.png">


***

**4. Big values**

- Big values are displayed when the taskname consist of “bigVal” or if colored “bigValC” 
- You can call an item of a “bigVal” Task something that consists “clock”/”time”, “date”, “year” to get this displayed independent of the value. (german speaking persons can also use “uhr” / "zeit", “datum” -> for date format with dots and "jahr") 

  <img width="150" alt="n2" src="https://user-images.githubusercontent.com/33860956/155341837-04b8feb2-77c6-4c88-bfa7-53f5d2644247.png">
  <img width="600" alt="bv1" src="https://user-images.githubusercontent.com/33860956/155341853-9ff7fc08-bc97-4d94-bd9d-ed66de8ed7ea.png">


***

**5. Additional things**

 - Thingspeak: add a thingspeak value to display the last value of a field of a public thingspeak channel, use this scheme for a valuename: 
   "name&<channel>&<fieldnumber>" optional you can give it a unit of measurement with ?<unit of measurement> (like in every other field):

<img width="547" alt="ts1" src="https://user-images.githubusercontent.com/33860956/159266759-b0431e09-75cc-46c6-8b72-353b8bb36f9d.png"> <img width="73" alt="ts1f" src="https://user-images.githubusercontent.com/33860956/159266767-14c3b32c-a429-482f-8e78-46eb23f59275.png">


<img width="546" alt="ts2" src="https://user-images.githubusercontent.com/33860956/159266771-29123c9b-0d32-4109-b681-566101caa433.png"><img width="143" alt="ts2f" src="https://user-images.githubusercontent.com/33860956/159266774-5fdb5ff3-9f60-49d4-a4dd-f4d5170afa5c.png">

 - grid layout (desktop view): 
    - the amount of colums (1,2,3 or maximum 4) is determined by the ammount of tiles. 
      - 1 tile = one colum
      - 2 - 4 tiles = 2 colums 
      - 5 - 9 tiles = 3 colums
      - \> 9 tiles = 4 colums
    - the ammount of "big values" however is prioritsed for rendering the grid layout and constrains it.
      - e.g. if a 4 colum grid is preferred just create a dummy-device with 4 values and call it "bigVal"
        but if you only have 3 values to display you can add an empty "big value" tile by calling an valuename "noval" or hide it with "XX"
![gridnorm](https://user-images.githubusercontent.com/33860956/159264739-6e322a4a-6f8e-46b3-be83-8b2ee6d7c4e7.png)   
![grid_noval](https://user-images.githubusercontent.com/33860956/159264715-8d959949-29cb-42e3-b78b-e73d1c439bd4.png)
![grid_XX](https://user-images.githubusercontent.com/33860956/159264731-da04fd8d-4006-409d-b324-659d877b5fcd.png)

    - with this "trick" you can have a 2 colum grid layout even wihout displaying any "big values":
![grid_2](https://user-images.githubusercontent.com/33860956/159265483-e06527c4-25ba-4f0a-bf9c-196242ae849a.png)


 

***

### Display options overview:
(options are case sensitive!)

**Options via taskname:**

The taskname needs to contain one of these phrases. E.g. 1bigVal, bigVal1, bigVal2, bigValtwo,...

* dButtons  --- creates an array of buttons (dummy device)
* bigVal / bigValC --- creates "big values" (any device)
* vSlider / nvSlider --- creates an array of "normal" slider (dummy device)
* tSlider  --- creates an array of "time" slider (dummy device)
* XX --- hides the task (any device)

**Options via valuename:**

The valuename needs to contain one of these phrases.

* btnState / btnStateC --- renders a button if beein the first value (any device)
* clock / time / uhr / zeit --- valuename for displaying the time set in espeasy (big values)
* date / datum  --- valuename for displaying the date set in espeasy (big values)
* year / jahr  --- valuename for displaying the year set in espeasy (big values)
* XX --- append this to the valuename to hide it (any value)

These options needs to be at the and of the valuename:

* Thingspeak (latest value of a field of a public channel ): "&\<thingspeakchannel>&\<field>" --- (any valuename)

* vSlider / nvSlider: "?\<min>?\<max>?\<step>"  (hint: change the amount of digits of the value to correspond with the stepsize)

This options needs to be at the very end and of the valuename:
  (e.g. "iamaslider?0?100?0.5?ms)
* "?\<UM>"  --- unit of measurement (any valuename)
* "&\<unit_number>" or "&\A" --- sends the event to the specific unit or if "A" to all units (only dButtons)




