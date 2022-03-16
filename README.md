I am not involved in the ESPeasy project but if you like my work please support the ESPeasy project and consider a donation: 
https://github.com/letscontrolit/ESPEasy

If you are looking for nice styling of the espeasy ui try my css: https://github.com/chromoxdor/espeasy_custom-css

# easyfetch

Easyfetch is a alternative dashboard in tile optic for espeasy. It was created to have a quick and relatively simple way of visualizing data and interacting with the hardware (buttons & slider) in a browser. Especially where no bigger infrastructure like a homeautomation server is needed (the ability to write complex rules in espeasy and the ability of communication between the nodes via a simple p2p-network can often make a full blown home automation system unnecessary).

The Wiki is work in progress...

Some infos about how to use it can be found here: https://www.letscontrolit.com/forum/viewtopic.php?f=6&t=8811

![fetch](https://user-images.githubusercontent.com/33860956/155348634-6d3e0c6f-65ff-4150-bb60-a58d0601a554.gif)

<img width="149" alt="n1" src="https://user-images.githubusercontent.com/33860956/155341745-4aa333c0-3281-4e8b-9c54-f73d792018eb.png">

Small update over the latest funtions(more elaborated manual will follow):
- Better mobile layout for three big values
- Colored option for the big value Tiles when the taskname consist of “bigValC” (otherwise only “bigVal”)
- You can call an item of a “bigVal” Task something that consists “clock”/”time”, “date”, “year” to get this displayed independent of the value. (german speaking person can also use “uhr” and “datum” -> for date format with dots)
 <img width="150" alt="n2" src="https://user-images.githubusercontent.com/33860956/155341837-04b8feb2-77c6-4c88-bfa7-53f5d2644247.png">
 <img width="389" alt="bv1" src="https://user-images.githubusercontent.com/33860956/155341853-9ff7fc08-bc97-4d94-bd9d-ed66de8ed7ea.png">

  - Every itemvalue of a task can have its own unit. Therefore add “?<unit>“ to the itemname (e.g. Temperature?°C or Humidity?H)
Notice: ?% is not an option because you´ll get an error message in espeasy so H is translated to % when displayed.

  - You can hide itemnames and values: add “XX” to the itemname (e.g. HumidityXX for name and value or for hiding only the name leave it empty or just name it “?°C” to keep the unit)
  
<img width="399" alt="s1" src="https://user-images.githubusercontent.com/33860956/155341905-ff97a256-2ba6-4660-a113-004262ee70b3.png">

- To make a buttontile, call the first! itemname “btnState” (a button whose color is dependent of the btnState 0=no color 1=blue) or “btnStateC” (this button is independent from its state always blue)

- Alert: whenever the value of “btnState” or “btnStateC” is 2 the tile becomes red.
<img width="399" alt="a1" src="https://user-images.githubusercontent.com/33860956/155341977-4e2b3a1e-6d8c-45ac-ba08-07c6feea8d3f.png">

- Slider: there are two types of slider. The “normal” slider and the “time set slider”

   The normal slider: There are two versions too.
  
     1. the slider with values displayed: name a task something consisting of “vSlider” and every item will become a Slider with values shown while sliding
  
     2. the slider with values hidden: name a task something consisting of “nvSlider”
  
  For both kinds of slider you can set a minimum, a maximum and the steps.
 
  To achieve this add ?<minimum>?<maximum>?<steps> to the itemname (e.g. slider?0?100?0.1)
   Notice: if you use this you must use it altogether. Standard values if unset are min=0 max=1023 step=1.

  <img width="432" alt="vS1" src="https://user-images.githubusercontent.com/33860956/155342066-a82bf559-f08a-49c5-bd36-abb7982221b5.png">

   The time set slider: Name a task something consisting of “tSlider” and every item will become a time set slider.
     The time set slider stores the values of both times in one number. This makes it easier to store these values with the regulator - level control plugin since only one plugin for both values is needed
     This slider has two thumbs for two time values (e.g. on and off time). Both times are stored in the corresponding itemvalue. The code example shows how to make use of it:
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
  
<img width="399" alt="ts" src="https://user-images.githubusercontent.com/33860956/155342234-12436142-1813-47e9-a789-9c803c8763de.png">

  
- Every tile calls an event (except big values): <taskname>event or when long pessed <taskname>long (e.g. “buttonevent” or “buttonlong”)
- Every slider calls an event when finished sliding. (“sliderevent”)
- Clicking on the unitname on top enters fullscreen on supported browsers
- Longpress/click on the nodes opens a new window with the device settings page of the node
- Last but not least: if you call the first item of a task “allNodes” the an event is send to all devices that are visible in the nodelist
