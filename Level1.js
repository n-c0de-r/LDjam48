	var objects;
	var platforms;
	var player;
	var map;
	var cursors;
	var exits;

var Level1 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "Level1" });
    },
    init: function() {},

    preload: function() {
        this.load.tilemapTiledJSON('Cave1', 'assets/Cave1.JSON');
		this.load.image('exit', 'assets/exit.png');
		this.load.image('Backgrounds', 'assets/Fore - Jungle Grass.png');
		this.load.image('Foregrounds', 'assets/plates.png');
		this.load.spritesheet('blob', 'assets/goop.png', { frameWidth: 16, frameHeight: 18 });
    },
	
    create: function() {
		
		map2 = this.add.tilemap('Cave1');
		
		var backgroundTiles2 = map2.addTilesetImage('back', 'Backgrounds');
		var foregroundTiles2 = map2.addTilesetImage('cave', 'Foregrounds');
		var backgroundLayer2 = map2.createLayer('Background', backgroundTiles2);
		var BKstuffLayer2 = map2.createLayer('BKstuff', foregroundTiles2);
		var middleLayer2 = map2.createLayer('Middle', backgroundTiles2);
		var caveLayer2 = map2.createLayer('Cave', foregroundTiles2);
		var stuffLayer2 = map2.createLayer('Stuff', foregroundTiles2);
		caveLayer2.setCollisionByExclusion(-1, true);
		
		exits = this.physics.add.group({
        allowGravity: false
		});
		exits.create(272, 312, 'exit');
		exits.setVisible(false);
		
		cursors = this.input.keyboard.createCursorKeys();
		
		player = this.physics.add.sprite(32,0, 'blob');
		
		player.setBounce(0.2);
		player.setCollideWorldBounds(true);
		
		player.body.setGravityY(300);
		
		this.physics.add.collider(player, caveLayer2);
		
		this.cameras.main.setBounds(0,0);
		this.cameras.main.startFollow(player, true, true, 0.05, 0.05);
		//this.cameras.main.setZoom(4);
		//this.cameras.main.setSize(200, 200);
		/*if (this.cameras.main.deadzone)
        {
           const graphics = this.add.graphics().setScrollFactor(0);
            graphics.lineStyle(2, 0x00ff00, 1);
            graphics.strokeRect(200, 200, this.cameras.main.deadzone.width, this.cameras.main.deadzone.height);
        }*/
		
		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('blob', { start: 3, end: 5 }),
			frameRate: 8,
			repeat: -1
		});
		
		this.anims.create({
			key: 'turn',
			frames: [ { key: 'blob', frame: 7 } ],
			frameRate: 20
		});
		
		this.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNumbers('blob', { frames: [7, 8, 6] }),
			frameRate: 6,
			repeatDelay: 2000,
			repeat: -1
		});
		
		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('blob', {start: 9, end: 11} ),
			frameRate: 8,
			repeat: -1
		});

    },
	
    update: function() {
		if (cursors.left.isDown)
		{
			player.setVelocityX(-160);

			player.anims.play('left', true);
		}
		else if (cursors.right.isDown)
		{
			player.setVelocityX(160);

			player.anims.play('right', true);
		}
		else if (cursors.shift.isDown)
		{
			this.scene.start("Start")
		}
		else
		{
			player.setVelocityX(0);

			player.anims.play('idle', true);
		}

		if ((cursors.up.isDown || cursors.space.isDown) && player.body.onFloor())
		{
			player.setVelocityY(-240);
		}
	}
});
